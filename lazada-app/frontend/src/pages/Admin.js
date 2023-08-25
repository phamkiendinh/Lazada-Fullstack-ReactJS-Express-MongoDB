import LeftPanel from '../components/Panel/LeftPanel/LeftPanel';
import { Outlet, useLoaderData } from 'react-router-dom';

function Admin() {
    const data = useLoaderData();
    const keys = Object.keys(data);

    return (
        <div className='row'>
            <div className='col-2 left-panel bg-dark mt-5'>
                <LeftPanel />
            </div>
            <div className='col-8 d-inline-block mt-5'>
                <div>
                    {
                        keys.map(key => {
                            return (
                                <h1 key={key}>{key} : {data[key]}</h1>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export async function loadAdmin() {
    var data = await
    fetch('http://localhost:3001/admin')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    })
    .catch(e => {
        console.log(e);
        return null;
    })
    return data;
}


export default Admin;