import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: [],
  eventsTotal: 0,
  eventsPerPage: 4,
  event: {}
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  },
  SET_EVENTS_PER_PAGE(state, eventsPerPage) {
    state.eventsPerPage = eventsPerPage
  }
}

export const actions = {
  createEvent({ commit }, event) {
    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
    })
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
        commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
      })
      .catch(error => {
        console.log('An error occurred ' + error.response)
      })
  },
  fetchEvent({ commit, getters, rootState }, id) {
    console.log(rootState.user.user.name)
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  },
  setEventsPerPage({ commit }, eventsPerPage) {
    commit('SET_EVENTS_PER_PAGE', eventsPerPage)
  }
}

export const getters = {
  getEventById: state => id => state.events.find(event => event.id === id),
  eventsPerPage: state => state.name
}
