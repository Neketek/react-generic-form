import React,{Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";


class BaseComponent extends Component{
  constructor(props){
    super(props);
  }

  static updatePropTypes(propTypes){
    const {propTypes:oldPropTypes={}} = this;
    this.propTypes = _.merge(
      {},
      _.cloneDeep(oldPropTypes),
      _.cloneDeep(propTypes)
    );
  }

  static updateDefaultProps(defaultProps){
    const {defaultProps:oldDefaultProps={}} = this;
    this.defaultProps = _.merge(
      {},
      _.cloneDeep(oldDefaultProps),
      _.cloneDeep(defaultProps)
    );
  }
}


export default BaseComponent;
