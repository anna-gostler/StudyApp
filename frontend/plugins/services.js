import LoginService from '~/assets/service/LoginService'
import VocabService from '~/assets/service/VocabService'

export default (ctx, inject) => {
  const services = {
    login: new LoginService(ctx.$axios),
    vocab: new VocabService(ctx.$axios)
  }

  inject('services', services)
}
