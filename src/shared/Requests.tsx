import AxiosApi from './AxiosApi';


const Requests = {
    login: (email: string, password: string) => {
        return AxiosApi.post("/auth", { email, password })
    },
    tags: {
        cadastrar: (epc: string, tipo: string) => {
            return AxiosApi.post("/api/tag", { epc, tipo })
        },
        getAll: () => {
            return AxiosApi.get("/api/tag")
        }
    },
    ativos: {
        getAll: () => {
            return AxiosApi.get("/api/active")
        },
        cadastrar: (numeroPatrimonio: string, activeCategoryId: string, tagId: string, marca: string, modelo: string, dataAquisicao: Date, dataFinalGarantia: Date, departamentId: string) => {
            return AxiosApi.post("/api/active",
                {
                    numeroPatrimonio, activeCategoryId, tagId, marca, modelo, dataAquisicao, dataFinalGarantia, departamentId
                }
            )
        }
    },
    departamento: {
        getAll: () => {
            return AxiosApi.get("/api/departament")
        },
    },
    categoriaAtivos: {
        getAll: () => {
            return AxiosApi.get("/api/active-category")
        },
    }
}

export default Requests