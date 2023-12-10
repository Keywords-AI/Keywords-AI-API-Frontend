import React from 'react'
import { Delete, Tick, Cross } from '../icons'
import IconButton from 'src/components/Buttons/IconButton/IconButton'
import { deleteConversation } from 'src/store/actions/conversationAction';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = {
    deleteConversation
}

function ConversationItem({ conversation, deleteConversation }) {
    const [conv, setConv] = React.useState(conversation);
    const [hover, setHover] = React.useState(false);

    return (
        <button
            className={"flex-row justify-between items-center self-stretch p-xxs bg-gray-2 hover:bg-gray-3 rounded-sm"}
            onClick={() => {
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex w-40 overflow-hidden truncate text-sm text-white">
                {conv?.name}
            </div>
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
                        icon={<Tick fill={"fill-gray-4 hover:fill-white"} />}
                    />
                </div>
                :
                <IconButton
                    onClick={() => {
                        setConv({ ...conv, deleting: true })
                    }}
                    icon={<Delete fill={"hover:fill-error " + (hover ? "fill-error" : "fill-gray-3")} />}
                />
            }
        </button>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationItem)