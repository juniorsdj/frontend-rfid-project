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
export default function Tags() {
    const [isLoading, setIsLoading] = useState(false)

    const [modalIsOpened, setModalIsOpened] = useState(false)

    const [epc, setEpc] = useState("")
    const [tipoTag, setTipoTag] = useState("")
    const [listaTags, setListaTags] = useState([])


    const cadastrarTag = async () => {
        setIsLoading(true)

        Requests.tags.cadastrar(epc, tipoTag)
            .then(r => {
                setEpc("")
                setTipoTag("")
                setIsLoading(false)
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

        Requests.tags.getAll()
            .then((r: any) => {
                if (r.r) {
                    setListaTags(r.data)
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
                <Button className="smallMarginBottom" content='Cadastrar TAG' primary onClick={() => setModalIsOpened(true)} />
            </div>

            <Table celled className="smallMarginTop" >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Data</Table.HeaderCell>
                        <Table.HeaderCell>EPC</Table.HeaderCell>
                        <Table.HeaderCell>Tipo</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        listaTags.map((item: any) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{format(new Date(item.createdAt), "d 'de' MMMM yyyy", { locale: ptBR })}</Table.Cell>
                                <Table.Cell>{item.epc}</Table.Cell>
                                <Table.Cell>{item.tipo}</Table.Cell>
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
                                    label='Eletronic Product Code'
                                    placeholder='4184XA841Z'
                                    value={epc}
                                    disabled={isLoading}
                                    onChange={(ev: any, { value }: { value: string }) => setEpc(value)}
                                />
                                <Form.Field
                                    control={Select}
                                    label='Tipo da Tag'
                                    options={tiposTag}
                                    placeholder='ativa'
                                    value={tipoTag}
                                    disabled={isLoading}
                                    onChange={(ev: any, { value }: { value: string }) => setTipoTag(value)}
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
                                onClick={() => cadastrarTag()}
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
