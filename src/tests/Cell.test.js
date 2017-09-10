import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, find, render, simulate } from 'enzyme'
import enzymeSerializer from 'enzyme-to-json/serializer'
import { spy } from 'sinon'
import { Cell } from './../components/Cell'
import configureStore from 'redux-mock-store'

const initialState = {}
let mockStore = configureStore(initialState)
expect.addSnapshotSerializer(enzymeSerializer)
describe('Cell', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Cell store={mockStore} />, div)
  })

  let component
  let props

  beforeEach(() => {
    props = {
      alive: true
    
    }
    component = mount(<Cell {...props} />)
  })



  it('receives an alive prop', () => {
 
    expect(component.props().alive).toEqual(true)
  })


  it('matches snapshot', () => {
    const comp = shallow(<Cell {...props} />)
    expect(comp).toMatchSnapshot()
  })
})
