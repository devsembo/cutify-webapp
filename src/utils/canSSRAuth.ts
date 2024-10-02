import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next"
import { parseCookies, setCookie, destroyCookie } from "nookies"
import { AuthTokenError } from "../services/errors/AuthTokenError"

// Função para páginas que só podem ser acessadas por utilizadores logados
export function canSSRAuth<P extends { [key: string]: unknown }>(
  fn: GetServerSideProps<P>,
) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const token = cookies["@cutifywebtoken.token"]

    if (!token) {
      // Armazena a URL original antes de redirecionar para o login
      const originalUrl = ctx.req.url ?? "/"
      setCookie(ctx, "@originalUrl", originalUrl, { path: "/" })

      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        console.log(
          "AuthTokenError caught, destroying cookie and redirecting to login...",
        )
        destroyCookie(ctx, "@cutifywebtoken.token")
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        }
      } else {
        console.log("An error occurred:", err)
        throw err
      }
    }
  }
}
