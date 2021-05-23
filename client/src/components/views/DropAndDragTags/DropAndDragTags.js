import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';



/*
const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class DropAndDragTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [
                { id: "Thailand", text: "tescht" },
                { id: "India", text: "tescht" }
            ],
            suggestions: [
                { id: 'USA', text: 'USA' },
                { id: 'Germany', text: 'Germany' },
                { id: 'Austria', text: 'Austria' },
                { id: 'Costa Rica', text: 'Costa Rica' },
                { id: 'Sri Lanka', text: 'Sri Lanka' },
                { id: 'Thailand', text: 'Thailand' }
            ]
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    render() {
        const { tags, suggestions } = this.state;
        return (
            <div>
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                    autofocus={true}
                    minQueryLength={0}
                    inline={false}
                />
            </div>
        )
    }
};
*/


function DropAndDragTags() {
    const [tags, setTags] = useState([
        { id: "Thailand", text: "tescht" },
        { id: "India", text: "tescht" }
    ]);

    const [suggestions, setSuggestions] = useState([
        { id: 'USA', text: 'USA' },
        { id: 'Germany', text: 'Germany' },
        { id: 'Austria', text: 'Austria' },
        { id: 'Costa Rica', text: 'Costa Rica' },
        { id: 'Sri Lanka', text: 'Sri Lanka' },
        { id: 'Thailand', text: 'Thailand' }
    ]);

    const KeyCodes = {
        comma: 188,
        enter: 13,
    };
    
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    function handleDelete(i) {
        setTags(tags.filter((tag, index) => index !== i));
    }

    function handleAddition(tag) {
        setTags([...tags, tag])
    }

    function handleDrag(tag, currPos, newPos) {
        const tags = [...tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    }

    return (
        <>
            <ReactTags tags={tags}
                suggestions={suggestions}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                delimiters={delimiters}
                autofocus={true}
                minQueryLength={0}
                inline={false}
            />
        </>
    )
}

export default DropAndDragTags

