import { produce } from 'immer'
import { ActionType } from './actions'
import { IProduct } from '../../contexts/CartContextProvider'

interface ICartState {
  orderList: IProduct[]
  deliveryAddress: {
    cep: string
    street: string
    number: string
    complement: string
    dristrict: string
    city: string
    uf: string
  }
  paymentMethod: 'creditCard' | 'debitCard' | 'money'
}

export function cartReducer(state: ICartState, action: any) {
  switch (action.type) {
    case ActionType.ADD_PRODUCT: {
      return produce(state, (draft) => {
        console.log(state)
        console.log(action)
        const orderIndex = draft.orderList.findIndex(
          (order) => order.id === action.payload.data.id,
        )
        console.log(orderIndex)
        if (orderIndex > -1) {
          draft.orderList[orderIndex].quantity += action.payload.data.quantity
        } else {
          draft.orderList.push({
            id: action.payload.data.id,
            quantity: action.payload.data.quantity,
          })
        }
      })
    }
    case ActionType.REMOVE_PRODUCT: {
      return produce(state, (draft) => {
        console.log(state)
        console.log(action)
        const orderIndex = draft.orderList.findIndex(
          (order) => order.id === action.payload.data.id,
        )
        if (orderIndex > -1) {
          draft.orderList.splice(orderIndex, 1)
        }
      })
    }
    case ActionType.COMPLETE_ORDER: {
      return state
    }
    default: {
      return state
    }
  }
}