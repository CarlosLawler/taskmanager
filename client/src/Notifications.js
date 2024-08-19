import { useParams } from 'react-router-dom';

function Notification() {
    const {name} = useParams();
    return (
        <>
            <div className='container-fluid vh-100 justify-content-center align-items-start bg-light pt-5'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-primary align-middle'>
                        <thead className='table-light'>
                            <h2 className='text-black text-start'>
                                {name}'s Notifications!
                            </h2>
                            <tr>
                                <th>Subject</th>
                                <th>From</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            <tr className='table-primary'>
                                <td>New Task Asigned</td>
                                <td>System</td>
                                <td>06/01/24</td>
                            </tr>
                            <tr className='table-primary'>
                                <td>Can someone do that thing?</td>
                                <td>ADexter</td>
                                <td>05/26/24</td>
                            </tr>
                            <tr className='table-primary'>
                                <td>New Task Asigned</td>
                                <td>System</td>
                                <td>05/14/24</td>
                            </tr>
                            <tr className='table-primary'>
                                <td>New Task Asigned</td>
                                <td>System</td>
                                <td>05/09/24</td>
                            </tr>
                        </tbody>
                        <tfoot className='text-light'>
                            what is this
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Notification;