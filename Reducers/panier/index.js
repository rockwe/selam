
const initialState = { panierArticle: [] }

function togglePanier(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_PANIER':
            // console.log(action);
            const check = state.panierArticle.filter(item => item && item._id === action.value._id);
            console.log('GOT => ',check.length);
            // const check = state.panierArticle.filter(item => item._id === action.value._id);
            if (check.length ) {
                // console.log('UPDATE ITEM IN STATE', check[0]);
                const article = action.value;
                article._qty = action.v1 ;
                const tmp = [];
                state.panierArticle.map(item => {
                    if (item) {
                        if(item._id === article._id) {
                            item._qty = article._qty;
                        }
                        tmp.push(item);
                    }
                });
                nextState = {
                    panierArticle: tmp
                };
            } else {
                //console.log('ADD ITEM TO STATE', action);
                const article = action.value;
                article._qty = action.v1 || 1;
                nextState = {
                    ...state,
                    panierArticle: [...state.panierArticle, article]
                }
            }
            return nextState || state;
        case 'DELETE_PANIER':
           // const panierArticleIndex = state.panierArticle.findIndex(item => item && item._id === action.value._id);
            const ids = [];
            state.panierArticle.map(item => { ids.push(item._id) });
            // Le Article est déjà dans les Panier, on le supprime de la liste
            nextState = {
                ...state,
                panierArticle: state.panierArticle.filter(item => item && item._id !== action.value)
            };
            return nextState || state;
        case 'DELETE_ALL':
            nextState = {
                ...state,
                panierArticle: []
            };
            return nextState || state;
        default:
            return state
    }
}

export default togglePanier