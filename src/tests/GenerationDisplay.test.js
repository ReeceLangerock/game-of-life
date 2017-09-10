import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, find, render, simulate } from 'enzyme'
import enzymeSerializer from 'enzyme-to-json/serializer'
import { spy } from 'sinon'
import { GenerationDisplay } from './../components/GenerationDisplay'
import configureStore from 'redux-mock-store'

const initialState = {}
let mockStore = configureStore(initialState)
expect.addSnapshotSerializer(enzymeSerializer)
describe('GenerationDisplay', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<GenerationDisplay store={mockStore} />, div)
  })

  let component
  let props

  beforeEach(() => {
    props = {
      generationCount: 10
    }
    component = mount(<GenerationDisplay {...props} />)
  })

  it('displays correct generation count', () => {
    expect(component.text()).toEqual('10')
  })

  it('receives a generationCount prop', () => {
    expect(component.props().generationCount).toEqual(10)
  })


  it('matches snapshot', () => {
    const comp = shallow(<GenerationDisplay {...props} />)
    expect(comp).toMatchSnapshot()
  })
})
