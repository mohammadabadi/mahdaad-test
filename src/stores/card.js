import { defineStore } from "pinia";
import { ref, computed } from "vue"

export const useCardStore = defineStore('card',()=>{
    const items = ref([])
    const custosmerId = ref(null)

    function StorageKey(){
       return `card-${custosmerId.value}`
    }
    const setCustomer = (id) => {
        custosmerId.value = id
        loadCard()
    }
    const addItem = (product) => {
        const exist = items.value.find((p)=>p.id === product.id) 
        if(exist){
            exist.qty++     
        }
        else{
            items.value.push({...product,qty:1})
        }
        saveCard()
    }
    const saveCard = () => {
        if(!custosmerId.value) return
        localStorage.setItem(StorageKey(),JSON.stringify(items.value))
    }
    const loadCard = () => {
        if(!custosmerId.value) return
        const saved = localStorage.getItem(StorageKey());
        items.value = saved ? JSON.parse(saved) : []
    }
    const removeItem = (id) => {
        const exist = items.value.find((p)=>p.id === id)
        if(exist){
            exist.qty--
            if(exist.qty <= 0){
                items.value = items.value.filter((p) => p.id !== id)
            }
        }
        saveCard()
    }
    const totalItems = computed(() => 
        items.value.reduce((sum,p) => sum + p.qty ,0)
    )
    const clearCard = () => {
        items.value = []
        saveCard()
    }
    return {
        items,
        custosmerId,
        totalItems,
        addItem,
        removeItem,
        clearCard,
        setCustomer
    }
})