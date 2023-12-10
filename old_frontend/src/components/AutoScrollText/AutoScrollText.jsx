import React from 'react'
import './style.css'
import readStream from 'src/services/readStream';

export default React.forwardRef((props, ref) => {
    const [conversationHeight, setConversationHeight] = React.useState(0);
    const [isUserAtBottom, setIsUserAtBottom] = React.useState(true);
    const conversationBox = ref.current;
    const { response, readOnly } = props;

    React.useEffect(() => {
        if (conversationBox) {
            const onScroll = () => {
                const atBottom =
                    conversationBox.scrollTop + conversationBox.clientHeight >=
                    conversationBox.scrollHeight - 5;
                setIsUserAtBottom(atBottom);
            };

            conversationBox.addEventListener("scroll", onScroll);
            return () => {
                conversationBox.removeEventListener("scroll", onScroll);
            };
        }
    }, []);

    React.useEffect(() => {
        if (conversationBox && isUserAtBottom) {
            conversationBox.scrollTop = conversationBox.scrollHeight;
        }
    }, [conversationHeight]);

    const addText = (text) => {
        try {
            const textChunks = text.split('\n\n\n');
            console.log(text);
            textChunks.forEach((textChunk) => {
                textChunk = textChunk.trim();
                let contentChunk;
                try {
                    contentChunk = JSON.parse(textChunk);
                } catch (error) {
                    console.log("Fuck!!",contentChunk);
                }
                const content = contentChunk.choices[0].delta.content;
                if (content) {
                    conversationBox.value += content;
                    setConversationHeight(conversationBox.scrollHeight);
                }
            });
        } catch (error) {
            // Handle JSON parsing error here
            console.log("Fuck!", error);
        }
    }

    React.useEffect(() => {
        if (response) {
            readStream(response, addText);
        }
    }, [response]);

    return (
        <textarea
            ref={ref}
            name="conversation"
            id="conversation"
            className="text-md"
            readOnly={readOnly}
        >
        </textarea>
    )
});
