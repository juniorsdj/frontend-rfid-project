import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, Input, Modal, Select, Table, Container } from 'semantic-ui-react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { format } from 'date-fns'
import Requests from '../../shared/Requests';
import ptBR from 'date-fns/locale/pt-BR';
import { SelectField } from '../../components/form/FormFields';



export default function Historico() {
    const [isLoading, setIsLoading] = useState(false)
    const [listaHistorico, setListaHistorico] = useState([])
    const [listaAtivosOptions, setListaAtivosOptions] = useState([])
    const [ativoSearch, setAtivoSearch] = useState("")





    const searchByFilter = async (filter: any) => {
        // data = ativoParaCadastrar[0]
        setAtivoSearch(String(filter))

        if (filter.trim() === "") {
            return Requests.historico.getAllHistorico()
                .then((r: any) => {
                    if (r.r) {
                        setIsLoading(false);
                        setListaHistorico(r.data)
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
        Requests.historico.getHistoricoByActiveId(filter).then((r: any) => {
            if (r.r) {
                setListaHistorico(r.data)
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
        setIsLoading(true)


        if (listaAtivosOptions.length === 0) {

            Requests.ativos.getAll()
                .then((r: any) => {
                    if (r.r) {
                        setListaAtivosOptions(r.data.map((item: any) => {
                            return {
                                value: item.id,
                                key: item.id,
                                text: `${item.modelo} - ${item.marca}`
                            }
                        }))
                    }
                })
                .catch(
                    err => {
                        console.log(err)
                    }
                )
        }

        Requests.historico.getAllHistorico()
            .then((r: any) => {
                if (r.r) {
                    setIsLoading(false)
                    setListaHistorico(r.data)
                }
            })
            .catch(
                err => {
                    setIsLoading(false)
                    console.log(err)
                }
            )
    }, [])




    
    return (
        <div className="smallMarginTop">

            <Container className="smallMarginTop">

                <Dropdown
                    label='Ativos'
                    placeholder='Escolha o ativo'
                    selection
                    options={listaAtivosOptions}
                    value={ativoSearch}
                    onChange={(ev, { value }) => { searchByFilter(value) }}

                />
            </Container>

            <Table celled className="smallMarginTop" >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>N Patrimônio</Table.HeaderCell>
                        <Table.HeaderCell>Movimentado em</Table.HeaderCell>
                        <Table.HeaderCell>Tipo movimentação</Table.HeaderCell>
                        {/* <Table.HeaderCell>Modelo</Table.HeaderCell> */}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        listaHistorico.map((item: any) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item.numPatrimonio}</Table.Cell>
                                <Table.Cell>{format(new Date(item.dataHoraMovimentacao), "d 'de' MMMM 'as' HH:mm ", { locale: ptBR })}</Table.Cell>
                                <Table.Cell>{item.tipoMovimentacao === 1 ? "Entrada" : "Saida"}</Table.Cell>
                                {/* <Table.Cell>{item.modelo}</Table.Cell> */}
                            </Table.Row>
                        ))
                    }


                </Table.Body>
            </Table>


        </div>


    );
}
