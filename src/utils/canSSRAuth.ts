import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { parseCookies, destroyCookie} from "nookies"
import { AuthTokenError } from "@/service/errors/AuthTokenError";

export function canSSRAuth<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        const token = cookies["@lapizza.token"];

        if(!token){
            return {
                redirect:{
                    destination: '/',
                    permanent: false,
                }
            }
        }

        try{
            return  await fn(ctx);
        }catch(err){
            if(err instanceof AuthTokenError){
                destroyCookie(ctx, "@lapizza.token");

                return{
                    redirect:{
                        destination: '/',
                        permanent: false,
                    }
                }
            }
        }
    }
}

