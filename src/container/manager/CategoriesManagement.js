import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import listAPI_Back from '../../api/API';
import axios from 'axios';
import { Button, Dialog, DialogContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FormUpdateCategory from '../../_sharecomponents/form/FormUpdateCategory';
import pageActions from '../../redux/actions/pageActions';
import userActions from '../../redux/actions/userActions';
import FormDeleteCategory from '../../_sharecomponents/form/FormDeleteCategory';
import { BiAddToQueue } from 'react-icons/bi'
import FormCreateCategory from '../../_sharecomponents/form/FormCreateCategory';
function CategoriesManagement(props) {

    const param = useParams();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [categories, setCategories] = useState([]);

    const [categorieUpdate, setCategorieUpdate] = useState({});

    const [isUpdateCategory, setIsUpdateCategory] = useState(false);
    const [isDeleteCategory, setIsDeleteCategory] = useState(false);
    const [isCreateCategory, setIscreateCategory] = useState(false);


    const _getCategories = async () => {
        await axios.get(listAPI_Back.GET_LIST_CATEGORIES).then((res) => {
            const categoryTemp = res.data

            setCategories(categoryTemp)
            console.log(categoryTemp);
        })

    }

    const _openFormUpdate = () => {
        dispatch(pageActions.openUpdateCategory())
    }

    const _closeFormUpdate = () => {
        dispatch(pageActions.closeUpdateCategory())

    }

    const _openFormDelete = () => {
        dispatch(userActions.openDeleteCategory())
    }

    const _closeFormDelete = () => {
        dispatch(userActions.closeDeleteCategory())

    }


    useEffect(() => {
        _getCategories()
    }, [])

    useEffect(() => {
        setIsUpdateCategory(selector.page.isUpdateCategory)
        _getCategories()
    }, [selector.page])
    useEffect(() => {
        setIsDeleteCategory(selector.user.isDeleteCategory)
        setIscreateCategory(selector.user.isCreateCategory)
        _getCategories()

    }, [selector.user])
    return (
        <div className='mt-28 flex flex-col items-center'>

            <Dialog
                open={isUpdateCategory}
                onClose={_closeFormUpdate}
            >
                <DialogContent>
                    <FormUpdateCategory
                        category={categorieUpdate}
                    />
                </DialogContent>

            </Dialog>

            <Dialog
                open={isDeleteCategory}
                onClose={_closeFormDelete}
            >
                <DialogContent>
                    <FormDeleteCategory
                        category={categorieUpdate}
                    />
                </DialogContent>

            </Dialog>

            <Dialog
                open={isCreateCategory}
                onClose={() => {
                    dispatch(userActions.closeCreateCategory())
                }}
            >
                <DialogContent>
                    <FormCreateCategory />
                </DialogContent>

            </Dialog>

            <div className='flex flex-col items-center mb-8'>
                <h1>Categories Management</h1>
            </div>
            <div>
                <div>

                </div>
                <table>
                    <tr>
                        <td />
                        <td />
                        <td />
                        <td colSpan={2}>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    dispatch(userActions.openCreateCategroy())
                                }}
                            >
                                Create new
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Status</th>
                    </tr>
                    {
                        categories.map((item) => {
                            return <tr>
                                <td>{item.id}</td>
                                <td>{item.categoryName}</td>
                                <td>{item.status}</td>
                                <td>
                                    <Button
                                        color='success'
                                        variant='outlined'
                                        onClick={() => {
                                            _openFormUpdate()
                                            setCategorieUpdate(item)
                                        }}
                                    >
                                        Update
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        color='error'
                                        variant='outlined'
                                        onClick={() => {
                                            _openFormDelete()
                                            setCategorieUpdate(item)
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        })
                    }
                </table>

            </div>
            <div>

            </div>
        </div>
    );
}

export default CategoriesManagement;