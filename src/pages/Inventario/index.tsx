import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Select, Table } from 'semantic-ui-react';
import { format, compareDesc } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Requests from '../../shared/Requests';

export default function Tags() {
    const [isLoading, setIsLoading] = useState(false)
    const [listaAtivos, setListaAtivos] = useState([])

    useEffect(() => {
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
    }, [])
    return (
        <div className="smallMarginTop">
            <Table celled >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>N Patrimônio</Table.HeaderCell>
                        <Table.HeaderCell>Categoria</Table.HeaderCell>
                        <Table.HeaderCell>Marca</Table.HeaderCell>
                        <Table.HeaderCell>Modelo</Table.HeaderCell>
                        <Table.HeaderCell>Data aquis.</Table.HeaderCell>
                        <Table.HeaderCell>status garantia</Table.HeaderCell>
                        <Table.HeaderCell>Localização</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        listaAtivos.map((item: any) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item.numeroPatrimonio}</Table.Cell>
                                <Table.Cell>{item.activeCategoryId}</Table.Cell>
                                <Table.Cell>{item.marca}</Table.Cell>
                                <Table.Cell>{item.modelo}</Table.Cell>
                                <Table.Cell>{format(new Date(item.dataAquisicao), "d 'de' MMMM yyyy", { locale: ptBR })}</Table.Cell>
                                {/* Se esse compare for 1, significa que a data da garantia é menor que hoje */}
                                <Table.Cell>{`${(compareDesc(new Date(item.dataFinalGarantia), new Date()) ? "Expirada" : "Ativa")} `}</Table.Cell>
                                <Table.Cell>{item.departamentId}</Table.Cell>


                            </Table.Row>
                        ))
                    }


                </Table.Body>
            </Table>


        </div>


    );
}
