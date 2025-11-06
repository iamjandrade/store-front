<template>
  <div>
    <div class="row q-gutter-sm">
      <div
        v-for="product in products"
        :key="product.id"
        class="col-12 col-sm-6 col-md-4 col-lg-2"
      >
        <q-card flat class="q-pa-sm">
          <q-card-section class="q-pt-xs q-pb-xs">
            <div class="text-subtitle1">{{ product.name }}</div>
            <div class="text-caption">Precio:   {{Currency(product.price,'USD')}}</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn outline dense color="green" label="Agregar al carrito" @click="addToCart(product)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
  <q-page-sticky position="top-right" :offset="[18, 18]">
    <q-btn outline  icon="shopping_cart" color="primary" label="ver carrito" size="md" @click="getCart()" />
  </q-page-sticky>

  <q-dialog position="right" full-height v-model="modal" transition-show="slide-left" transition-hide="slide-right" :maximized="$q.screen.lt.md">
    <q-card>
      <q-bar class="q-pa-lg text-body text-bold" :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'">
        <q-icon class="text-bold" name="add" />
        <div class="">Carrito de compras</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-primary">{{$t('close')}}</q-tooltip>
        </q-btn>
      </q-bar>
      <q-separator inset />
      <q-card-section> 
        <div v-if="cart.items.length !== 0">
          <div class="row q-gutter-sm">
            <div
              v-for="item in cart.items"
              :key="item.id"
              class="col-12"
            >
              <q-card flat class="q-pa-sm">
                <q-card-section class="q-pt-xs q-pb-xs">
                  <q-btn dense flat round icon="delete" color="red" class=" cursor-pointer absolute-top-right" @click="removeItem(item.id)"/>
                  <div class="text-subtitle1">{{ item.product.name }}</div>
                  <div class="text-caption">Precio:   {{Currency(item.product.price,'USD')}}</div>
                  <q-input style="max-width: 100px;" label="Cantidad" dense outlined v-model="item.quantity" type="number" min="1" @change="updateQuantity(item)" />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <p v-else class="text-body">Carrito vacío.</p>
      </q-card-section>
      <div class="q-pa-md text-right">
       <div class="text-caption">Total de artículos: {{ cart.items_count }}</div>
        <div class="text-caption">Subtotal: {{ Currency(cart.subtotal, 'USD') }}</div>
      </div>
      <div class="q-pa-md text-right">
         <q-btn  icon="shopping_cart_checkout" class="full-width" color="positive" label="Pagar" size="md" @click="checkout()" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { useHelpersBooking } from 'src/composables/helpers.js'
export default 
{
  components:
  {
  },
  setup() 
  {
      const { Currency} =  useHelpersBooking ()

    return { Currency }
  },
  data: () => 
  ({
    products: [],
    modal: false,
    cart: [],
  }),  
  methods:
  {
    getProducts()
    {
      this.$q.loading.show()
   
      this.$api.get('/products').then((response) => 
      {
        if(response.data.length != 0)
        {
          console.log(response.data.data)
          this.products = response.data.data

        }
      })
      .catch((e) => 
      {
        this.$q.notify({type:'negative',position:'bottom-right',message:this.$t('error')})
      })
      .finally(() => 
      {
        this.$q.loading.hide()
      })
    },
    addToCart(product)
    {
      this.$q.loading.show()

      let post =  
      {
        product_id: product.id
      }
   
      this.$api.post('/cart/items',post).then((response) => 
      {
         console.log('Se agrego al carrito.')
      })
      .catch((e) => 
      {
        this.$q.notify({type:'negative',position:'bottom-right',message:this.$t('error')})
      })
      .finally(() => 
      {
        this.$q.loading.hide()
      })
    },
    getCart()
    {
      this.$q.loading.show()
      this.$api.get('/cart').then((response) => 
      {
         this.cart = response.data.data
         this.modal = true
      })
      .catch((e) => 
      {
        this.$q.notify({type:'negative',position:'bottom-right',message:this.$t('error')})
      })
      .finally(() => 
      {
        this.$q.loading.hide()
      })
    },
    removeItem(itemId)
    {
      console.log('Eliminando item: '+itemId)
      this.$q.loading.show()
      this.$api.delete('/cart/items/'+itemId).then((response) => 
      {
         this.$q.notify({type:'positive',position:'bottom-right',message:'Producto eliminado del carrito.'})
         this.getCart()
      })
      .catch((e) => 
      {
        this.$q.notify({type:'negative',position:'bottom-right',message:this.$t('error')})
      })
      .finally(() => 
      {
        this.$q.loading.hide()
      })
    },
    updateQuantity(item)
    {
      this.$q.loading.show()
      let put =  
      {
        quantity: item.quantity
      }
      this.$api.patch('/cart/items/'+item.id,put).then((response) => 
      {
         this.$q.notify({type:'positive',position:'bottom-right',message:'Cantidad actualizada.'})
         this.getCart()
      })
      .catch((e) => 
      {
        this.$q.notify({type:'negative',position:'bottom-right',message:this.$t('error')})
      })
      .finally(() => 
      {
        this.$q.loading.hide()
      })
    },
    checkout()
    {
      this.$q.loading.show()
      this.$api.post('/cart/complete').then((response) => 
      {
         this.$q.notify({type:'positive',position:'bottom-right',message:'Compra realizada con éxito.'})
         this.modal = false
      })
      .catch((e) => 
      {
        this.$q.notify({type:'negative',position:'bottom-right',message:this.$t('error')})
      })
      .finally(() => 
      {
        this.$q.loading.hide()
      })
    }
  },
  mounted() 
  {
    this.getProducts()
  },
  unmounted()
  {
  },
  beforeUnmount()
  {
  }
}
</script>
<style scoped>
/* Scoped styles for Home component (keeps style block non-empty to satisfy linters) */
</style>