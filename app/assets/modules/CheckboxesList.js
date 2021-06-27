class CheckboxesList {
    constructor() {
        checkboxesList = [];
    }

    addItem(option) {
        checkboxesList.push(option);
    }

    fetchArray() {
        return checkboxesList;
    }
}

class Checkbox extends Component {
    constructor() {
        super();
        this.state = {
            checked: null
        }
    }

    componentDidMount() {
        if (this.props.checked) {
            this.setState({ checked: true }, () => {
                this.props.checkedObjArr.addItem({
                    'key': this.props.keyValue,
                    'value': this.props.value,
                    'label': this.props.label
                });
            });
        } else {
            this.setState({ 
                checked: false
            });
        }
    }

    stateSwitcher(key, label, value) {
        this.setState({ checked: !this.state.checked }, () => {
            if (this.state.checked) {
                this.props.checkedObjArr.addItem({ 
                    'key': key,
                    'value': value,
                    'label': label
                });
            } else {
                this.props.checkedObjArr.fetchArray().splice(this.props.checkedObjArr.fetchArray().findIndex(y => y.key == key), 1);
            }
        });
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this.stateSwitcher.bind(this, this.props.keyValue, this.props.label, this.props.value)} 
                underlayColor="transparent"
                style={{ marginVertical: 20 }}>

                <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center' }}>
                    <View style={{
                        padding: 4, 
                        width: this.props.size, 
                        height: this.props.size, 
                        backgroundColor: this.props.color
                    }}>
                    {
                        (this.state.checked)
                        ?
                        (<View style={styles.selectedUI}>
                        <Image source={require('./assets/tick.png')} style={styles.checkboxTickImg} />
                        </View>)
                        :
                        (<View style={styles.uncheckedCheckbox} />)
                    }
                    </View>
                <Text style={[styles.checkboxLabel, { color: this.props.labelColor }]}>
                {this.props.label}
                </Text>
                </View>
            </TouchableHighlight>
        );
    }
}
