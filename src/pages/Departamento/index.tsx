import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Select, Table } from 'semantic-ui-react';
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Requests from '../../shared/Requests';



const tiposTag = [
    {
        value: "ATIVA",
        key: "ATIVA",
        text: "ATIVA"
    },
    {
        value: "PASSIVA",
        key: "PASSIVA",
        text: "PASSIVA"
    },
    {
        value: "SEMIPASSIVA",
        key: "SEMIPASSIVA",
        text: "SEMI-PASSIVA"
    },
]
export default function Departamento() {
    const [isLoading, setIsLoading] = useState(false)

    const [modalIsOpened, setModalIsOpened] = useState(false)

    const [sigla, setSigla] = useState("")
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [listaDepartamento, setListaDepartamento] = useState([])


    const cadastrarDepartamento = async () => {
        setIsLoading(true)

        Requests.departamento.cadastrar(nome, descricao, sigla)
            .then(r => {
                setNome("")
                setDescricao("")
                setSigla("")
                setDescricao("")
                setModalIsOpened(false)
            })
            .catch(err => {
                setIsLoading(false)
            })

    }

    useEffect(() => {
        if (modalIsOpened) {
            return
        }

        Requests.departamento.getAll()
            .then((r: any) => {
                if (r.r) {
                    setListaDepartamento(r.data)
                }

            })
            .catch(
                err => {
                    console.log(err)
                }
            )
    }, [modalIsOpened])

    return (
        <div className="smallMarginTop">
            <div className="flex-end">
                <Button className="smallMarginBottom" content='Cadastrar Departamento' primary onClick={() => setModalIsOpened(true)} />
            </div>

            <Table celled className="smallMarginTop" >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Data</Table.HeaderCell>
                        <Table.HeaderCell>Sigla</Table.HeaderCell>
                        <Table.HeaderCell>Nome</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        listaDepartamento.map((item: any) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{format(new Date(item.createdAt), "d 'de' MMMM yyyy", { locale: ptBR })}</Table.Cell>
                                <Table.Cell>{item.sigla}</Table.Cell>
                                <Table.Cell>{item.nome}</Table.Cell>
                            </Table.Row>
                        ))
                    }


                </Table.Body>
            </Table>
            {
                modalIsOpened && (
                    <Modal
                        onClose={() => setModalIsOpened(false)}
                        open={modalIsOpened}
                    >
                        <Modal.Header>Cadastro de TAGS</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Field
                                    control={Input}
                                    label='Nome'
                                    placeholder='Cordenação geral'
                                    value={nome}
                                    disabled={isLoading}
                                    onChange={(ev: any, { value }: { value: string }) => setNome(value)}
                                />
                                <Form.Field
                                    control={Input}
                                    label='Descrição'
                                    placeholder='Responsável por terere'
                                    value={descricao}
                                    disabled={isLoading}
                                    onChange={(ev: any, { value }: { value: string }) => setDescricao(value)}
                                />
                                <Form.Field
                                    control={Input}
                                    label='Sigla'
                                    placeholder='CG1'
                                    value={sigla}
                                    disabled={isLoading}
                                    onChange={(ev: any, { value }: { value: string }) => setSigla(value)}
                                />
                               

                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                                color='black'
                                onClick={() => setModalIsOpened(false)}
                                disabled={isLoading}
                            >
                                Voltar
                      </Button>
                            <Button
                                color="green"
                                onClick={() => cadastrarDepartamento()}
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                Cadastrar
                                </Button>
                        </Modal.Actions>
                    </Modal>
                )
            }


        </div>


    );
}
