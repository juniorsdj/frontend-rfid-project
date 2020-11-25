import React, { useState, useEffect } from 'react'
import { Form,  Dropdown, } from 'semantic-ui-react'

export const SelectField = (props: any) => {
    const { required, value } = props


    const [valueDefault, setValueDefault] = useState(value ? value : '')

    useEffect(() => {   
        props.setValue(props.name, valueDefault)
    })

    useEffect(() => {
        props.register({ name: props.name }, { required });
    }, [props.register])

    return (
        <Form.Field width={props.width} error={props.errors ? true : false}>
            <label>{props.label}</label>
            <Dropdown
                selection
                search={props.search}
                placeholder={props.placeholder}
                options={props.options}
                value={valueDefault}
                loading={props.loading}
                onChange={(event, data) => {
                    setValueDefault(data.value)
                    props.setValue(props.name, data.value)
                    if (props.errors && props.clearError) {
                        props.clearError(props.name)
                    }
                }}
            />

            <span className='fieldWithError'>{props.errors && props.errors.type === 'required' && 'Obrigatório'}</span>
        </Form.Field>
    )
}