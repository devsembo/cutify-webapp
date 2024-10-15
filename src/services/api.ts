import axios from "axios"
import { parseCookies } from "nookies"
import { GetServerSidePropsContext } from "next"

export function setupAPIClient(
  ctx: GetServerSidePropsContext | undefined = undefined,
) {
  const cookies = parseCookies(ctx)

  const api = axios.create({
    //baseURL: "https://cutify-api-sv8s.onrender.com:3333",
    baseURL: "https://cutify-api-sv8s.onrender.com",
    headers: {
      Authorization: `Bearer ${cookies["@cutifywebtoken.token"]}`,
    },
    timeout: 5000,
  })

  return api
}
