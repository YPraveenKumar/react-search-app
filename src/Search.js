import React, { useEffect, useState } from 'react'
import Modal from 'react-modal/lib/components/Modal';

Modal.setAppElement('#root')
export default function Search() {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('');

    const [modelIsOpen, setModelIsOpen] = useState(false);

    const searchText = (e) => {
        setFilter(e.target.value)
        let dataSearch = data?.filter((item) => item?.title?.includes(e.target.value));
        setFilteredData(dataSearch)
    }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/').then((res) => res.json()).then(apiData => setData(apiData));
    }, [])


    return (
        <div className="border border-secondary" style={{ margin: '35px' }}>
            <section className='py-4 container'>
                <div className='row justify-content-center'>
                    <h2>React Search App</h2>
                    <div className='col-12 mb-5'>
                        <div className='mb-3 col-x4 mx-auto text-center'>
                            <label className='form-label h4'></label>
                            <input type='text' className='form-control' placeholder='search title' value={filter} onChange={(e) => searchText(e)} />
                        </div>
                    </div>
                    {filteredData?.map((item, index) => {
                        return (
                            <div className='col-11 col-md-6 col-lg-3 mx-0 mb4' onClick={() => setModelIsOpen(true)}>
                                <div className='card p-0 overflow-hidden h-100 shadow'>
                                    <img src='https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg' className='card-image-top' alt='Passenger Image'></img>
                                    <div className='card-body'>
                                        <h5 className='card-title'>{item.title}</h5>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {filteredData?.map((item, index) => {
                        return (
                            <Modal isOpen={modelIsOpen} onRequestClose={() => setModelIsOpen(false)}
                                style={{
                                    overlay: { backgroundColor: 'grey' },
                                    content: { color: 'orange' }, margin: '160px'
                                }}>
                                <h3>{item.title}</h3>
                                <h5>{item.body}</h5>
                                <button type="button" className="btn btn-warning" onClick={() => setModelIsOpen(false)}>Close</button>
                            </Modal>
                        )
                    })}
                </div>
            </section>
        </div>

    )
}
