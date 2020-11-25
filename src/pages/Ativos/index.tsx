import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, Input, Modal, Select, Table, Container } from 'semantic-ui-react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { format } from 'date-fns'
import Requests from '../../shared/Requests';
import ptBR from 'date-fns/locale/pt-BR';
import { SelectField } from '../../components/form/FormFields';


// const ativoParaCadastrar = [{ "numeroPatrimonio": 9999, "activeCategoryId": "DATA_SHOW", "tagId": "1241242", "marca": "LENOVO", "modelo": "FAS41", "dataAquisicao": "2020-10-28", "dataFinalGarantia": "2020-10-31" }]




export default function Tags() {
    const { handleSubmit, register, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false)
    const [departamentSearch, setDepartamentSearch] = useState("")

    const [modalIsOpened, setModalIsOpened] = useState(false)
    const [listaAtivos, setListaAtivos] = useState([])
    const [departamentoOptions, setDepartamentoOptions] = useState([])
    const [tagsOptions, setTagsOptions] = useState([])
    const [categoriaOptions, setCategoriaOptions] = useState([])

    const handleSubmitForm = async (data: any) => {
        // data = ativoParaCadastrar[0]

        setIsLoading(true);
        Requests.ativos.cadastrar(data.numeroPatrimonio, data.categoria, data.tagRelacionada, data.marca, data.modelo, data.dataAquisicao, data.dataGarantia, data.departamento)
            .then((r: any) => {
                console.log(r)
                setModalIsOpened(false)
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            })



    };
    const searchByFilter = async () => {
        // data = ativoParaCadastrar[0]
        if (departamentSearch.trim() === "") {
            return Requests.ativos.getAll()
                .then((r: any) => {
                    if (r.r) {
                        setIsLoading(false);
                        setListaAtivos(r.data)
                    }
                })
                .catch(
                    err => {
                        setIsLoading(false);
                        console.log(err)
                    }
                )
        }

        setIsLoading(true);
        Requests.ativos.getAtivosFromDepartament(departamentSearch).then((r: any) => {
            if (r.r) {
                setListaAtivos(r.data)
                setIsLoading(false);
            }
        })
            .catch(
                err => {
                    setIsLoading(false);
                    console.log(err)
                }
            )



    };

    useEffect(() => {
        if (modalIsOpened) {
            return
        }
        if (tagsOptions.length === 0) {
            Requests.tags.getAll()
                .then((r: any) => {
                    if (r.r) {
                        const optionsTags = r.data.map((item: any) => {
                            return {
                                value: item.id,
                                key: item.id,
                                text: `${item.epc} - ${item.tipo}`
                            }
                        })
                        setTagsOptions(optionsTags)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }

        if (categoriaOptions.length === 0) {
            Requests.categoriaAtivos.getAll()
                .then((r: any) => {
                    if (r.r) {
                        const optionsCategoria = r.data.map((item: any) => {
                            return {
                                value: item.id,
                                key: item.id,
                                text: `${item.sigla}`
                            }
                        })
                        setCategoriaOptions(optionsCategoria)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        if (departamentoOptions.length === 0) {
            Requests.departamento.getAll()
                .then((r: any) => {
                    if (r.r) {
                        const optionsDepartamento = r.data.map((item: any) => {
                            return {
                                value: item.id,
                                key: item.id,
                                text: `${item.sigla}`
                            }
                        })
                        setDepartamentoOptions(optionsDepartamento)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }

        Requests.ativos.getAll()
            .then((r: any) => {
                if (r.r) {
                    setListaAtivos(r.data)
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
                <Button className="smallMarginBottom" content='Cadastrar Ativo' primary onClick={() => setModalIsOpened(true)} />
            </div>

            <Container className="smallMarginTop">
                <Form.Field
                    control={Input}
                    label='Departamento'
                    placeholder='101'
                    value={departamentSearch}
                    disabled={isLoading}
                    onChange={(ev: any, { value }: { value: string }) => setDepartamentSearch(value)}
                />
                <div className="flex-end">
                    <Button
                        color='black'
                        onClick={() => searchByFilter()}
                        disabled={isLoading}
                    >
                        Buscar
                      </Button>
                </div>
            </Container>

            <Table celled className="smallMarginTop" >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>N Patrimônio</Table.HeaderCell>
                        <Table.HeaderCell>Criação</Table.HeaderCell>
                        <Table.HeaderCell>Marca</Table.HeaderCell>
                        <Table.HeaderCell>Modelo</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        listaAtivos.map((item: any) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item.numeroPatrimonio}</Table.Cell>
                                <Table.Cell>{format(new Date(item.createdAt), "d 'de' MMMM yyyy", { locale: ptBR })}</Table.Cell>
                                <Table.Cell>{item.marca}</Table.Cell>
                                <Table.Cell>{item.modelo}</Table.Cell>
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
                        <Modal.Header>Cadastro de Ativo</Modal.Header>
                        <Modal.Content>
                            <Form id="id-form" onSubmit={handleSubmit(handleSubmitForm)}>
                                <Form.Group inline widths='equal'>

                                    <Form.Field className="required">
                                        <label>
                                            Número do patrimônio
                                            </label>
                                        <div className="ui fluid input">
                                            <input ref={register} name="numeroPatrimonio" placeholder="4152"
                                                // required
                                                type="number" />
                                        </div>
                                    </Form.Field>

                                    <Form.Field className="required">
                                        <label>Marca</label>
                                        <div className="ui fluid input">
                                            <input ref={register} name="marca" placeholder="Lenovo"
                                                // required
                                                type="text" />
                                        </div>
                                    </Form.Field>

                                    <Form.Field className="required">
                                        <label>HOST</label>
                                        <div className="ui fluid input">
                                            <input ref={register} name="host" placeholder="COINF"
                                                // required
                                                type="text" />
                                        </div>
                                    </Form.Field>
                                    <Form.Field className="required">
                                        <label>Modelo</label>
                                        <div className="ui fluid input">
                                            <input ref={register} name="modelo"
                                                // required
                                                type="text" />
                                        </div>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group inline widths="4">
                                    <Form.Field className="required">
                                        <label>
                                            Data da aquisição
                                            </label>
                                        <div className="ui fluid input">
                                            <input ref={register} name="dataAquisicao" placeholder="01/01/2010"
                                                // required
                                                type="date" />
                                        </div>
                                    </Form.Field>
                                    <Form.Field className="required">
                                        <label>
                                            Garantia até
                                            </label>
                                        <div className="ui fluid input">
                                            <input ref={register} name="dataGarantia" placeholder="01/01/2020"
                                                // required
                                                type="date" />
                                        </div>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group inline widths="4">
                                    <SelectField
                                        name='departamento'
                                        label='Departamento'
                                        register={register}
                                        options={departamentoOptions}
                                        setValue={setValue}
                                        // required
                                        placeholder='COINF'
                                    />
                                    <SelectField
                                        name='categoria'
                                        label='Categoria'
                                        register={register}
                                        options={categoriaOptions}
                                        setValue={setValue}
                                        // required
                                        placeholder='DATA SHOW'
                                    />


                                </Form.Group>
                                <SelectField
                                    search
                                    width="8"
                                    // required
                                    name='tagRelacionada'
                                    label='Tag relacionada'
                                    options={tagsOptions}
                                    placeholder='10349141230'
                                    register={register}
                                    setValue={setValue}
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
                                form="id-form"
                                color="green"
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
