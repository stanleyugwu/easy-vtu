module.exports = ({config}) => ({
    ...config,
    extra:{
        localStoreKey: '__evu-key__',
    }
})