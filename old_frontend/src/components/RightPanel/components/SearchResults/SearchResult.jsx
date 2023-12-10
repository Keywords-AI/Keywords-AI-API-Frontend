import React, { useState, useEffect } from "react";
import {
    List,
    Typography,
    ListItem,
    Box,
    ListItemButton,
    TextField,
    Avatar,
    Button
} from "@mui/material";
import { ReactComponent as StarIcon } from "src/assets/icons/star.svg";
import { ReactComponent as SortIcon } from "src/assets/icons/filter.svg";
import { ReactComponent as SearchIcon } from "src/assets/icons/Search.svg";
import { ReactComponent as BusinessIcon } from "./static/img/default_company.svg";
import CloseIcon from "@mui/icons-material/Close";
import { connect } from "react-redux";
import {
    fetchResults,
    setShowJobDetails,
    setSelectedJob
} from "src/store/actions/actions";
import ButtonMenu from "../ButtonMenu";
import "./static/css/style.css";
import "./static/css/search_results_items.css";

const mapStateToProps = state => {
    return {
        searchResults: state.searchResults,
        conversation: state.conversation,
        selectedJob: state.job.selectedJob,
        showJobDetails: state.job.showJobDetails
    };
};

const mapDispatchToProps = {
    fetchResults,
    setShowJobDetails,
    setSelectedJob
};

function SearchResult({ searchResults, setShowJobDetails, setSelectedJob }) {
    // Retrieve the items (speific jobs) from the stored search results
    const [searchTerm, setSearchTerm] = useState("");
    const [hoveredItemIndex, setHoveredItemIndex] = useState(-1);
    const [buttonPress, setButtonPress] = useState([false, false]);
    const [sortMethodIndex, setSortMethodIndex] = useState(0);

    // Retrieve the items (speific jobs) from the stored search results
    // searchResults = {job_id: {job_info}, job_id: {job_info}...}
    const items = Object.values(searchResults);
    //
    // For the hover effect on individual cards, hover to show right arrow
    const handleMouseEnter = index => {
        setHoveredItemIndex(index);
    };
    const handleMouseLeave = () => {
        setHoveredItemIndex(-1);
    };

    // Handle the search terms for filtering job names and company names
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    // If the job is within 3 days, show the new job labeling in the cards
    const isNewJob = item => {
        let today = new Date();
        let date = new Date(item.stale_date);
        let difference = (today - date) / (1000 * 3600 * 24);
        return difference < 3;
    };
    const handlePressSort = () => {
        setButtonPress([buttonPress[0], !buttonPress[1]]);
    };
    const handlePressFav = () => {
        setButtonPress([!buttonPress[0], buttonPress[1]]);
    };
    const sortMethod = (a, b) => {
        switch (sortMethodIndex) {
            case 0:
                //sort by matching score
                // TODO: Matching Scroe is not presented in the data
                return new Date(a.upload_date) - new Date(b.upload_date);
            case 1:
                //sort by date
                return new Date(a.upload_date) - new Date(b.upload_date);
            case 2:
                //sort by company name
                return a.company.localeCompare(b.company);
            case 3:
                //sort by job title
                return a.position.localeCompare(b.position);
            default:
                return 0;
        }
    };

    return (
        <Box className="search-result">
            <TextField
                variant="filled"
                name="query-result-filter"
                sx={{
                    height: "32px",
                    width: "100%",
                    fontWeight: 400,
                    fontSize: "13px",
                    lineHeight: "15px",
                    borderRadius: "4px",
                    bgcolor: "#191919",
                    "& .MuiInputBase-input": {
                        p: 0,
                        pl: "8px",
                        color: "white",
                        height: "32px",
                        borderRadius: "4px",
                        backgroundColor: "#191919"
                    },
                    "& .MuiFilledInput-root": {
                        fontWeight: 400,
                        fontSize: "13px",
                        lineHeight: "15px",
                        "&:before": {
                            borderBottom: "none !important"
                        },
                        "&:after": {
                            borderBottom: "none !important"
                        },
                        // Add focus style for the border
                        "&.Mui-focused": {
                            borderColor: "white",
                            borderRadius: "4px",
                            boxShadow: "0 0 0 1px #fff"
                        }
                    },
                    "& .MuiInputBase-input::placeholder": {
                        color: "text.secondary"
                    },
                    "& .MuiOutlinedInput-root": {
                        pr: 0,
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white"
                        }
                    }
                }}
                placeholder="Company, job title, location..."
                value={searchTerm}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <SearchIcon />,
                    endAdornment: searchTerm && searchTerm !== "" && (
                        <CloseIcon
                            sx={{
                                width: "12px",
                                height: "12px",
                                cursor: "pointer"
                            }}
                            onClick={() => {
                                setSearchTerm("");
                            }}
                        />
                    )
                }}
            />
            {!items || items.length === 0 && 
            <div className="empty-results-panel"
            >
                <span>
                    start a query
                </span>
            </div>
            }
            {items && items.length > 0 && (
                <ul className="search-result-items">
                    {items
                        // .sort(sortMethod)
                        // .filter((item) => {
                        //   // TODO: item.favorite is not presented in the data
                        //   return buttonPress[0] === true && item.favorite === true;
                        // })
                        .filter(item => {
                            return (
                                item.position
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase()) ||
                                item.company
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            );
                        })
                        .map((item, i) => (
                            <ListItem
                                onMouseEnter={() => handleMouseEnter(i)}
                                onMouseLeave={handleMouseLeave}
                                disablePadding
                                key={i}
                                onClick={() => {
                                    setSelectedJob(item);
                                    setShowJobDetails(true);
                                }}
                                className="search-result-item"
                            >
                                <div className="search-result-content">
                                    {item.logo !== "unknown" ? (
                                        <Avatar
                                            src={item.logo}
                                            sx={{
                                                bgcolor: "white",
                                                width: 24,
                                                height: 24
                                            }}
                                        ></Avatar>
                                    ) : (
                                        <BusinessIcon />
                                    )}
                                    <Box
                                        display={"flex"}
                                        flexDirection={"column"}
                                        overflow={"hidden"}
                                        gap={"4px"}
                                        flex={1}
                                    >
                                        <Typography
                                            sx={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                height: "15px"
                                            }}
                                            variant="text2"
                                            noWrap={false}
                                        >
                                            {item.position}
                                        </Typography>
                                        <Box
                                            display={"flex"}
                                            gap={"8px"}
                                            alignItems={"center"}
                                        >
                                            <Typography
                                                sx={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    height: "13px",
                                                    color: "#BBBBBB"
                                                }}
                                                variant="text4"
                                                noWrap={false}
                                            >
                                                {`${item.company}`}
                                            </Typography>
                                            {isNewJob(item) && (
                                                <Box
                                                    bgcolor={"primary.error"}
                                                    display={"flex"}
                                                    alignItems={"center"}
                                                    width={"31px"}
                                                    height={"13px"}
                                                    borderRadius={"4px"}
                                                    px={"4px"}
                                                >
                                                    <Typography
                                                        variant="text4"
                                                        color="black"
                                                    >
                                                        New
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                </div>
                                {/* <StarIcon
                                    sx={{
                                        width: "12px",
                                        height: "12px",
                                    }}
                                /> */}
                            </ListItem>
                        ))}
                </ul>
            )}
        </Box>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
