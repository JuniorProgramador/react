import axios from 'axios'
import {toastr} from 'react-redux-toastr'
import consts from '../const'

export function login(values){
    return submit(values, `${consts.OAPI_URL}/login`)
}

export function singup(values){
    return submit(values, `${consts.OAPI_URL}/singup`)
}


export function logout(values){
    return {type:"TOKEN_VALIDATED", payload:false}
}


export function validateToken(token){
    return dispatch => {
        if(token) {
            axios.post(`${consts.OAPI_URL}/validateToken`, {token}).then(resp => {
                dispatch({type: 'TOKEN_VALIDATED', payload: resp.data.valid})
            })
            .catch(e => dispatch({type: 'TOKEN_VALIDATED', payload: false}))
        }else{
            dispatch({type: 'TOKEN_VALIDATED', payload: false})
        }
    }
}

function submit(values, url){
    return dispatch => {
        axios.post(url, values ).then(
            resp => {
                dispatch([{type:"USER_FETCHED", payload:resp.data}])
            }).catch( e=>{
                e.response.data.erros.forEach( error => toastr.error("error", error))
            })
    }
}