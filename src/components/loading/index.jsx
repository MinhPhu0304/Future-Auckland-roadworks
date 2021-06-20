import React from 'react'
import { connect } from 'react-redux'

import { PAGE_STATE } from 'store/reducers/pageState'
import './index.css'

export const LoadingIndicator = connect(mapStateToProps)(LoadingDumb)

function mapStateToProps({ pageState }) {
  return {
    pageState
  }
}

function LoadingDumb({ pageState }) {
  if (pageState === PAGE_STATE.LOADING) {
    return (
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div><div></div><div></div><div></div><div></div><div></div>
        <p style={{ marginBottom: 100 }}>
          Loading data...
        </p>
      </div>
    )
  }
  if (pageState === PAGE_STATE.FAILED) {
    return (
      <div className="fail-loading__container">
        <p>
          Uh-oh! Looks like we could not get future road works
        </p>
      </div>
    )
  }
  return null
}
