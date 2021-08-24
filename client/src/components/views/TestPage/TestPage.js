import React from 'react'
import NewFileUpload from "../../utils/NewFileUpload"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TestPage() {
    return (
        <div>
            <ToastContainer />
                            
            <NewFileUpload></NewFileUpload>
        </div>
    )
}

export default TestPage
