// import produce from 'immer';
// import * as CardActions from './actions';

// // here we use immer for can use the push method, is more easy that pure redux
// export default function user(state = [], action) {
//   switch (action.type) {
//     case '@user/ADD_SUCCESS':
//       return produce(state, (draft) => {
//         const productIndex = draft.findIndex((p) => p.id === action.product.id);

//         if (productIndex >= 0) {
//           draft[productIndex].amount += 1;
//         } else {
//           draft.push({ ...action.product, amount: 1 });
//         }
//       });
//     case '@user/REMOVE':
//       return produce(state, (draft) => {
//         const productIndex = draft.findIndex((p) => p.id === action.id);

//         if (productIndex >= 0) {
//           draft.splice(productIndex, 1);
//         }
//       });

//     case '@user/UPDATE_AMOUNT': {
//       if (action.amount <= 0) {
//         return state;
//       }

//       return produce(state, (draft) => {
//         const productIndex = draft.findIndex((p) => p.id === action.id);

//         if (productIndex >= 0) {
//           draft[productIndex].amount = Number(action.amount);
//         }
//       });
//     }

//     default:
//       return state;
//   }
// }
