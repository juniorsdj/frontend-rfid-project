import AxiosApi from './AxiosApi';
import queryString from "query-string";

const stringifyQueryString = (obj: any) => {
    const keys = Object.keys(obj).filter(
        (key) => obj[key] !== "" && obj[key] !== " "
    );
    const retorno: any = {};
    keys.forEach((key) => (retorno[key] = obj[key]));
    return queryString.stringify(retorno);
};


const Requests = {
    login: (email: string, password: string) => {
        return AxiosApi.post("/auth", { email, password })
    },
    tags: {
        cadastrar: (epc: string, tipo: string) => {
            return AxiosApi.post("/tag", { epc, tipo })
        },
        getAll: () => {
            return AxiosApi.get("/tag")
        }
    },
    ativos: {
        getAll: () => {
            return AxiosApi.get("/active")
        },
        getAtivosFromDepartament: (departament: string) => {
            return AxiosApi.get(`/active/departament/${departament}`)
        },
        cadastrar: (numeroPatrimonio: string, activeCategoryId: string, tagId: string, marca: string, modelo: string, dataAquisicao: Date, dataFinalGarantia: Date, departamentId: string) => {
            return AxiosApi.post("/active",
                {
                    numeroPatrimonio, activeCategoryId, tagId, marca, modelo, dataAquisicao, dataFinalGarantia, departamentId
                }
            )
        }
    },
    departamento: {
        getAll: () => {
            return AxiosApi.get("/departament")
        },
        cadastrar: (sigla: string,
            nome: string,
            descricao: string) => {
            return AxiosApi.post("/departament",{
                sigla,
                nome,
                descricao
            })
        },
    },
    categoriaAtivos: {
        getAll: () => {
            return AxiosApi.get("/active-category")
        },
    }
}

export default Requests