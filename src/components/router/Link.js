import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Link extends Component {
    static contextTypes = {
        route: PropTypes.string,
        linkHandler: PropTypes.func
    }

    handleClick = (evt) => {
        evt.preventDefault()
        this.context.linkHandler(this.props.to)
        /* pushState takes three arguments, the first is a state object, second represents a page title, third is the location we want to add to the browser's history*/
        //eslint-disable-next-line
        //history.pushState(null, '', this.props.to)
    }

    render() {
        const activeClass = this.context.route === this.props.to ? 'active' : ''
        // eslint-disable-next-line
        return <a href="#" className={activeClass} onClick={this.handleClick}>{this.props.children}</a>
    }
}


Link.propTypes = {
    to: PropTypes.string.isRequired
}