import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, find, render, simulate } from 'enzyme'
import enzymeSerializer from 'enzyme-to-json/serializer'
import { spy } from 'sinon'
import { Board } from './../components/Board'
import { Cell } from './../components/Cell'
import configureStore from 'redux-mock-store'

const initialState = {}
let mockStore = configureStore(initialState)
expect.addSnapshotSerializer(enzymeSerializer)
describe('Board', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Board store={mockStore} />, div)
  })

  let component
  let props

  beforeEach(() => {
    props = {
    
    }
    component = shallow(<Board {...props} />)
  })

  it('renders correct number of cells', () => {
    expect(component.find(Cell).length).toBe(60*60);
    
  })

  it('receives a method', () => {
    // expect(component.props()).toEqual('')
  })


  it('matches snapshot', () => {
    const comp = shallow(<Board {...props} />)
    expect(comp).toMatchSnapshot()
  })
})
