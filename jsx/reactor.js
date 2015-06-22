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
window.ReactSubItem = React.createClass({
    render: function() {
        var reactComponent = this.props.reactComponent;
        var subItem = reactComponent.props.item.prop6;
        var updateSubItemClickHandler = createUpdateSubItemClickHandler(reactComponent);
        
        return (
            <li>
                <ul>
                    <li>{subItem.text} {subItem.counter}</li>
                    <li><a href="javascript:void(0)" onClick={updateSubItemClickHandler}>Update</a></li>
                </ul>
            </li>
        );
    }
});

window.ReactItem = React.createClass({
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
                <ReactSubItem reactComponent={this} />
            );
        }

        return (
            <ul>
                <li>{item.prop1}</li>
                <li>{item.prop2}</li>
                <li>{item.prop3}</li>
                <li>{item.prop4}</li>
                <li className="random-number">{item.prop5}</li>
                <li><a href="javascript:void(0)" onClick={showSubItemClickHandler}>{item.prop6.showHide} SubItem</a></li>
                {subItem}
            </ul>
        );
    },
    componentDidUpdate: function () {
        var time = (new Date().getTime() - this.props.startTime) + " ms";
        this.props.scope.setUpdateTime(time);
        console.log("REACT - Item updated in: " + time);
    }
});

window.ReactItemList = React.createClass({
    render: function() {
        this.props.startTime = new Date().getTime();
        var scope = this.props.scope;
        var items = scope.items;
        
        var rows = _.map(items, function(item) {
            return (
                <ReactItem key={item.prop1} item={item} scope={scope} />
            );
        });

        return (
            <div>{rows}</div>
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