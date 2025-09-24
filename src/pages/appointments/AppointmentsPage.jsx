import { Section } from '../../components';
import { Divider } from '@mui/material';
import { Form } from './components/Form';
import './AppointmentsPage.css';

const AppointmentsPage = () => {
    return (
        <Section title="Sacar Turno" className="appointments-page">

            <div>
                <span>Para sacar un turno, por favor, complete el siguiente formulario.</span>
                <Form submitFunction={() => {}} loading={false} errors={{}} />
            </div>
            <Divider orientation="vertical" sx={{margin: '2rem'}} variant='middle' flexItem />
            <div>
                <span>Si tiene alguna duda, no dude en contactarnos a través de nuestro formulario de contacto o llamándonos al (011) 1234-5678.</span>
            </div>
        </Section>
    )
}

export default AppointmentsPage;