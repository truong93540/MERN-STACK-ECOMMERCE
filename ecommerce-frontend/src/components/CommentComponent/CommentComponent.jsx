import React from 'react'

const CommentComponent = (props) => {
    const { dataHref, width } = props
    return (
        <div className="mt-2">
            <div
                className="fb-comments"
                data-href={dataHref}
                data-width={width}
                data-numposts="5"></div>
        </div>
    )
}

export default CommentComponent
