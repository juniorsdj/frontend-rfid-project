import React, { useState } from 'react'
import { Button, Form, Grid, Header, Input, Message, Segment, Table } from 'semantic-ui-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Requests from '../../shared/Requests';
import { goToIndex } from './../../shared/FnUtils'
import { useDispatch } from 'react-redux';
import { login } from '../../actions/systemActions';

interface ILogin {
    email: string,
    password: string
}
// const usuarioEntra = {
//     "Email": "jonjonlocao@gmail.com",
//     "password": "jonlindo1234"
// }

export default function Login() {
    const { handleSubmit, register} = useForm<ILogin>();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);

    const [loginErrors, setLoginErrors] = useState([]);

    const handleSubmitForm: SubmitHandler<ILogin> = async (data) => {

        setLoading(true);

        Requests.login(data.email, data.password)
            .then((r: any) => {
                if (r.r) {
                    dispatch(login(r.data))
                }

                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            })



    };

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    {/* <Image src='/logo.png' /> Log-in to your account */}
                </Header>
                <form onSubmit={handleSubmit(handleSubmitForm)}
                    id="form-login">
                    <Segment stacked>
                        <Form.Field>
                            <div className="ui fluid left icon input">
                                <input ref={register} 
                                // value={usuarioEntra.Email}
                                 name="email" placeholder="E-mail address" required type="text" />
                            </div>
                        </Form.Field>
                        <Form.Field>
                            <div className="ui fluid left icon input">
                                <input ref={register} 
                                // value={usuarioEntra.password}
                                 name="password" placeholder='Password' required type='password' />
                            </div>
                        </Form.Field>
                        <Button
                            loading={loading}
                            disabled={loading}
                            color='teal'
                            fluid
                            size='large'>
                            Login
                        </Button>
                    </Segment>
                </form>

            </Grid.Column>
        </Grid>

    );
}
