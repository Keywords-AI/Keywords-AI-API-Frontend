import React, { useEffect } from 'react'
import { Delete, Check, Cross } from 'src/components/Icons/iconsDS'
import { Button, IconButton } from 'src/components/Buttons'
import { deleteConversation, getConversation } from 'src/store/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = {
    deleteConversation,
    getConversation,
}

function ConversationItem({
    conversation,
    deleteConversation,
    getConversation
}) {
    const [conv, setConv] = React.useState(conversation);
    const [hover, setHover] = React.useState(false);
    return (
        <Button
            variant="panel"
            onClick={() => {
                getConversation()
            }}
            onMouseEnter={() => {
                setHover(true)
            }}
            onMouseLeave={() => {
                setHover(false)
            }}
            justification="justify-between"
        >
            <div className="flex w-40 overflow-hidden truncate text-sm text-white">
                {conv?.name}
            </div>
            {(hover || conv?.deleting) &&
                <>
                    {conv?.deleting ?
                        <div className="flex-row gap-xxs flex-shrink-0">
                            <IconButton
                                onClick={() => {
                                    setConv({ ...conv, deleting: false })
                                }}
                                icon={<Cross fill={"fill-gray-4 hover:fill-white"} />}
                            />
                            <IconButton
                                onClick={() => {
                                    deleteConversation(conv.id);
                                    setConv({ ...conv, deleting: false })
                                }}
                                icon={<Check fill={"fill-gray-4 hover:fill-white"} />}
                            />
                        </div>
                        :
                        <IconButton
                            onClick={() => {
                                setConv({ ...conv, deleting: true })
                            }}
                            icon={<Delete />}
                        />
                    }
                </>
            }

        </Button>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationItem)