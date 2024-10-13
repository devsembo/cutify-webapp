import axios from "axios"
import { parseCookies } from "nookies"
import { GetServerSidePropsContext } from "next"

export function setupAPIClient(
  ctx: GetServerSidePropsContext | undefined = undefined,
) {
  const cookies = parseCookies(ctx)

  const api = axios.create({
    //baseURL: "http://192.168.1.81:3333",
    baseURL: "http://192.168.1.81:3333",
    headers: {
      Authorization: `Bearer ${cookies["@cutifywebtoken.token"]}`,
    },
    timeout: 5000,
  })

  return api
}
