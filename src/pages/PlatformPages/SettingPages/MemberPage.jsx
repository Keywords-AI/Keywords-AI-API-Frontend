import React from 'react'
import { connect } from 'react-redux'
import { MemberCard } from 'src/components/Cards/MemberCard'

export const MemberPage = (props) => {
  return (
    <div>
      <MemberCard first_name="John" last_name="Doe" />
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MemberPage)