import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import StationData from './station.json';

const suggestions = StationData.station;

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.textline,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

renderInput.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object.isRequired,
    InputProps: PropTypes.object,
};

function renderSuggestion(suggestionProps) {
    const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}

renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]).isRequired,
    index: PropTypes.number.isRequired,
    itemProps: PropTypes.object.isRequired,
    selectedItem: PropTypes.string.isRequired,
    suggestion: PropTypes.shape({
        label: PropTypes.string.isRequired,
    }).isRequired,
};

function getSuggestions(value, { showEmpty = false } = {}) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 && !showEmpty
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

const useStyles = makeStyles(theme => ({
    textline: {
        textAlign: 'center',
    },
    candidate: {
        marginLeft: '10%',
        marginRight: '10%',
    },
    center: {
        display: 'flex',
        marginLeft: '10%',
        marginRight: '10%',
    },
}));


export default function StationSelect(props) {
    const classes = useStyles();

    return (
        <div>
            <Downshift id="downshift-simple" >
                {({
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    getMenuProps,
                    highlightedIndex,
                    inputValue,
                    isOpen,
                    selectedItem,
                }) => {
                    const { onBlur, onFocus, ...inputProps } = getInputProps({
                        placeholder: '',
                        value: props.place,
                        onChange: e => {
                            e.persist();
                            props.handlePlaceChange(e.target.value);
                        },
                    });

                    return (
                        <div>
                            {renderInput({
                                classes,
                                className: classes.center,
                                label: '最寄り駅',
                                InputProps: { 
                                    onBlur,
                                    onFocus,
                                },
                                InputLabelProps: getLabelProps({ shrink: true }),
                                inputProps,
                                
                            })}

                            <div {...getMenuProps()} textAlign='center' >
                                {isOpen ? (
                                    <Paper className={classes.candidate} square>
                                        {getSuggestions(inputValue).map((suggestion, index) =>
                                            renderSuggestion({
                                                suggestion,
                                                index,
                                                itemProps: getItemProps({
                                                    onClick: () => {
                                                        props.handlePlaceChange(suggestion.label);
                                                    },
                                                    item: suggestion.label,
                                                }),
                                                highlightedIndex,
                                                selectedItem,
                                            }),
                                        )}
                                    </Paper>
                                ) : null}
                            </div>
                        </div>
                    );
                }}
            </Downshift>
        </div >
    );
}