/** @jsx React.DOM */

/*
* CLICK HANDLERS
**/
function createShowSubItemClickHandler(reactComponent) {
    var scope = reactComponent.props.scope;
    return scope.$apply.bind(
        scope,
        scope.onReactShowSubItemClick.bind(null, reactComponent)
    );
}

function createUpdateSubItemClickHandler(reactComponent) {
    var scope = reactComponent.props.scope;
    return scope.$apply.bind(
        scope,
        scope.onReactUpdateSubItemClick.bind(null, reactComponent)
    );
}

/*
* REACT COMPONENTS
**/
window.ReactSubItem = React.createClass({displayName: "ReactSubItem",
    render: function() {
        var reactComponent = this.props.reactComponent;
        var subItem = reactComponent.props.item.prop6;
        var updateSubItemClickHandler = createUpdateSubItemClickHandler(reactComponent);
        
        return (
            React.createElement("li", null, 
                React.createElement("ul", null, 
                    React.createElement("li", null, subItem.text, " ", subItem.counter), 
                    React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)", onClick: updateSubItemClickHandler}, "Update"))
                )
            )
        );
    }
});

window.ReactItem = React.createClass({displayName: "ReactItem",
    render: function() {
        this.props.startTime = new Date().getTime();
        var item = this.props.item;
        var reactSubItem = {
            reactComponent: this,
            scope: this.props.scope,
            item: item
        };

        var showSubItemClickHandler = createShowSubItemClickHandler(this);

        var subItem = null;
        if (item.prop6.show) {
            subItem = (
                React.createElement(ReactSubItem, {reactComponent: this})
            );
        }

        return (
            React.createElement("ul", null, 
                React.createElement("li", null, item.prop1), 
                React.createElement("li", null, item.prop2), 
                React.createElement("li", null, item.prop3), 
                React.createElement("li", null, item.prop4), 
                React.createElement("li", {className: "random-number"}, item.prop5), 
                React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)", onClick: showSubItemClickHandler}, item.prop6.showHide, " SubItem")), 
                subItem
            )
        );
    },
    componentDidUpdate: function () {
        var time = (new Date().getTime() - this.props.startTime) + " ms";
        this.props.scope.setUpdateTime(time);
        console.log("REACT - Item updated in: " + time);
    }
});

window.ReactItemList = React.createClass({displayName: "ReactItemList",
    render: function() {
        this.props.startTime = new Date().getTime();
        var scope = this.props.scope;
        var items = scope.items;
        
        var rows = _.map(items, function(item) {
            return (
                React.createElement(ReactItem, {item: item, scope: scope})
            );
        });

        return (
            React.createElement("div", null, rows)
        );
    },
    componentDidMount: function () {
        measureTime(this.props, "REACT - List mounted in: ");
    },
    componentDidUpdate: function () {
        measureTime(this.props, "REACT - List updated in: ");
    }
});

function measureTime(props, message) {
    if (props.scope.showReact) {
        var time = (new Date().getTime() - props.startTime) + " ms";
        props.scope.setUpdateTime(time);
        console.log(message + time);
    }
}