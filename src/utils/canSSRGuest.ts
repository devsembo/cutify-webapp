import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next"

// Função para páginas que só podem ser acessadas por utilizadores não logados
export function canSSRGuest<P extends { [key: string]: unknown }>(
  fn: GetServerSideProps<P>,
) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    return await fn(ctx)
  }
}
