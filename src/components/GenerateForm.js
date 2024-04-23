import React, { useState } from 'react';
import axios from 'axios';
import {
    Document,
    ExternalHyperlink,
    HeadingLevel,
    Packer,
    Paragraph,
    TabStopType,
    TextRun,
    FrameAnchorType,
    HorizontalPositionAlign,
    VerticalPositionAlign
} from "docx";
import saveAs from "file-saver";

const API_URL = "http://127.0.0.1:4000/";

const GenerateForm = () => {
    const [values, setValues] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        linkedin: "",
        professionalSummary: "",
        section: {},
        skills: [],
        achievements: [],
        extraCurricular: [],
        trainings: [],
        certifications: [],
        others: [],
        project: [],
        experience: [],
        internships: [],
        education: [],
        computerSkills: [],
        languages: [],
        ambiguous: "",
    });
    const generateDocx = async () => {
        try {
            const doc = new Document({
                styles: {
                    default: {
                        heading1: {
                            run: {
                                size: 44,
                                font: "Cambria",
                                // color: !values.name && "FF0000",
                            },
                        },
                        heading2: {
                            run: {
                                size: 26,
                                font: "Cambria",
                                bold: true,
                            },
                        },
                    },
                },
                sections: [
                    {
                        properties: {
                            // Optional properties for the section go here i.e styling
                            page: {
                                margin: {
                                    top: 720,
                                    right: 720,
                                    bottom: 720,
                                    left: 720,
                                },
                            },
                        },
                        children: [
                            new Paragraph({
                                text: `${values.name}`,
                                heading: HeadingLevel.HEADING_1,
                                alignment: "center",
                                spacing: {
                                    line: 276,
                                },
                            }),
                            new Paragraph({
                                alignment: "center",
                                children: [
                                    new TextRun({
                                        text: `${values.email} | ${values.phoneNumber}`,
                                        size: 22,
                                        font: "Cambria",
                                    }),
                                ],
                                spacing: {
                                    line: 276,
                                },
                            }),

                            values.linkedin &&
                            new Paragraph({
                                alignment: "center",
                                children: [
                                    new ExternalHyperlink({
                                        children: [
                                            new TextRun({
                                                text: values.linkedin,
                                                style: "Hyperlink",
                                                size: 22,
                                                font: "Cambria",
                                            }),
                                        ],
                                        link: "https://" + values.linkedin,
                                    }),
                                ],
                                spacing: {
                                    line: 276,
                                },
                            }),
                            new ExternalHyperlink({
                                children: [
                                    new TextRun({
                                        text: "",
                                        style: "Hyperlink",
                                    }),
                                ],
                                link: "",
                            }),
                            values.professionalSummary && values.professionalSummary.length &&
                            new Paragraph({
                                text: "Professional Summary",
                                heading: HeadingLevel.HEADING_2,
                                spacing: {
                                    line: 276,
                                    before: 120,
                                }
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: values.professionalSummary,
                                        size: 22,
                                        font: "Cambria",
                                    }),
                                ],
                            }),
                            new Paragraph({})
                            ,
                            values.experience &&
                            values.experience.length &&
                            new Paragraph({
                                text: "EXPERIENCE",
                                heading: HeadingLevel.HEADING_2,
                                spacing: {
                                    line: 276,
                                    before: 120,
                                },
                                // thematicBreak: wantHorizontalLine ? true : false,
                            }),
                            ...(values.experience || [])
                                .map((val) => {
                                    const arr = [];
                                    arr.push(
                                        new Paragraph({
                                            tabStops: [
                                                {
                                                    type: TabStopType.RIGHT,
                                                    position: 10368,
                                                },
                                            ],
                                            children: [
                                                new TextRun({
                                                    text: `${val.companyName}: ${val.profileName}`,
                                                    size: 22,
                                                    font: "Cambria",
                                                    bold: true,
                                                }),
                                                new TextRun({
                                                    text: `\t${val.date}`,
                                                    size: 22,
                                                    font: "Cambria",
                                                    bold: true,
                                                }),
                                            ],
                                            spacing: {
                                                line: 276,
                                            },
                                        })
                                    );
                                    val.bulletPoints.forEach((point) => {
                                        arr.push(
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: point,
                                                        size: 22,
                                                        font: "Cambria",
                                                    }),
                                                ],
                                                spacing: {
                                                    line: 276,
                                                },
                                                bullet: {
                                                    level: 0,
                                                    font: "Cambria",
                                                },
                                            })
                                        )
                                    });
                                    val.additionalPoints.forEach((point) => {
                                        arr.push(
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: point,
                                                        size: 22,
                                                        font: "Cambria",
                                                    }),
                                                ],
                                                spacing: {
                                                    line: 276,
                                                },
                                                bullet: {
                                                    level: 0,
                                                    font: "Cambria",
                                                },
                                            })
                                        )
                                    });
                                    // val.bulletPoint
                                    //     .split("\n")
                                    //     .filter((pro) => pro !== "")
                                    //     .forEach((bulletPoint) =>
                                    //         arr.push(
                                    //             new Paragraph({
                                    //                 children: [
                                    //                     new TextRun({
                                    //                         text: bulletPoint,
                                    //                         size: 22,
                                    //                         font: "Cambria",
                                    //                     }),
                                    //                 ],
                                    //                 spacing: {
                                    //                     line: 276,
                                    //                 },
                                    //                 bullet: {
                                    //                     level: 0,
                                    //                     font: "Cambria",
                                    //                 },
                                    //             })
                                    //         )
                                    //     );

                                    // val.links
                                    //     .split("\n")
                                    //     .filter((pro) => pro !== "")
                                    //     .forEach((link) =>
                                    //         arr.push(
                                    //             new Paragraph({
                                    //                 children: [
                                    //                     new TextRun({
                                    //                         text: link,
                                    //                         size: 22,
                                    //                         font: "Cambria",
                                    //                     }),
                                    //                 ],
                                    //                 spacing: {
                                    //                     line: 276,
                                    //                 },
                                    //                 bullet: {
                                    //                     level: 0,
                                    //                 },
                                    //             })
                                    //         )
                                    //     );

                                    return arr;
                                })
                                .reduce((prev, curr) => prev.concat(curr), []),
                            new Paragraph({}),
                            values.internships &&
                            values.internships.length &&
                            new Paragraph({
                                text: "INTERNSHIP",
                                heading: HeadingLevel.HEADING_2,
                                spacing: {
                                    line: 276,
                                    before: 120,
                                },
                                // thematicBreak: wantHorizontalLine ? true : false,
                            }),
                            ...(values.internships || [])
                                .map((val) => {
                                    const arr = [];
                                    arr.push(
                                        new Paragraph({
                                            tabStops: [
                                                {
                                                    type: TabStopType.RIGHT,
                                                    position: 10368,
                                                },
                                            ],
                                            children: [
                                                new TextRun({
                                                    text: `${val.companyName}: ${val.profileName}`,
                                                    size: 22,
                                                    font: "Cambria",
                                                    bold: true,
                                                }),
                                                new TextRun({
                                                    text: `\t${val.date}`,
                                                    size: 22,
                                                    font: "Cambria",
                                                    bold: true,
                                                }),
                                            ],
                                            spacing: {
                                                line: 276,
                                            },
                                        })
                                    );
                                    val.bulletPoints.forEach((point) => {
                                        arr.push(
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: point,
                                                        size: 22,
                                                        font: "Cambria",
                                                    }),
                                                ],
                                                spacing: {
                                                    line: 276,
                                                },
                                                bullet: {
                                                    level: 0,
                                                    font: "Cambria",
                                                },
                                            })
                                        )
                                    });
                                    return arr;
                                })
                                .reduce((prev, curr) => prev.concat(curr), []),
                            new Paragraph({}),

                            // values.section["Education"] && values.section["Education"].length &&
                            // new Paragraph({
                            //   spacing: {
                            //     line: 276,
                            //     before: 60,
                            //   },
                            //   border: {
                            //     top: {
                            //       style: "single",
                            //       size: 6,
                            //       color: "000000",
                            //     },
                            //   },
                            // }),

                            values.education &&
                            values.education.length &&
                            new Paragraph({
                                text: "EDUCATION",
                                heading: HeadingLevel.HEADING_2,
                                spacing: {
                                    line: 276,
                                    before: 120,
                                },
                                // thematicBreak: wantHorizontalLine ? true : false,
                            }),

                            ...(values.education || [])
                                .map((val) => {
                                    const arr = [];
                                    arr.push(
                                        new Paragraph({
                                            tabStops: [
                                                {
                                                    type: TabStopType.RIGHT,
                                                    position: 10368,
                                                },
                                            ],
                                            children: [
                                                new TextRun({
                                                    text: `${val.collegeName}`,
                                                    size: 22,
                                                    font: "Cambria",
                                                    bold: true,
                                                }),
                                                new TextRun({
                                                    text: `\t${val.dates}`,
                                                    size: 22,
                                                    font: "Cambria",
                                                    bold: true,
                                                }),
                                            ],
                                            spacing: {
                                                line: 276,
                                            },
                                        })
                                    );

                                    arr.push(
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: `${val.courseName || ""}, ${val.marks || ""}`,
                                                    size: 22,
                                                    font: "Cambria",
                                                }),
                                            ],
                                        })
                                    );

                                    return arr;
                                })
                                .reduce((prev, curr) => prev.concat(curr), []),
                            new Paragraph({}),

                            // values.project.length &&
                            //   new Paragraph({
                            //     spacing: {
                            //       line: 276,
                            //       before: 60,
                            //     },
                            //     border: {
                            //       top: {
                            //         style: "single",
                            //         size: 6,
                            //         color: "000000",
                            //       },
                            //     },
                            //   }),

                            values.project && values.project.length &&
                            new Paragraph({
                                text: "PROJECTS",
                                heading: HeadingLevel.HEADING_2,
                                spacing: {
                                    line: 276,
                                    before: 120,
                                },
                                // thematicBreak: wantHorizontalLine ? true : false,
                            }),

                            ...(values.project || [])
                                .map((project) => {
                                    const arr = [];
                                    arr.push(
                                        new Paragraph({
                                            tabStops: [
                                                {
                                                    type: TabStopType.RIGHT,
                                                    position: 10368,
                                                },
                                            ],
                                            children: [
                                                new TextRun({
                                                    text: `${project.projectName}`,
                                                    size: 22,
                                                    font: "Cambria",
                                                    bold: true,
                                                }),
                                                new TextRun({
                                                    text: `\t${project.date}`,
                                                    size: 22,
                                                    font: "Cambria",
                                                    bold: true,
                                                }),
                                            ],
                                            spacing: {
                                                line: 276,
                                            },
                                        })
                                    );

                                    project.projectDetails
                                        .map((detail) =>
                                            arr.push(
                                                new Paragraph({
                                                    children: [
                                                        new TextRun({
                                                            text: detail,
                                                            size: 22,
                                                            font: "Cambria",
                                                        }),
                                                    ],
                                                    spacing: {
                                                        line: 276,
                                                    },
                                                    bullet: {
                                                        level: 0,
                                                    },
                                                })
                                            )
                                        );

                                    return arr;
                                })
                                .reduce((prev, curr) => prev.concat(curr), []),
                            new Paragraph({}),

                            // values.skills.length &&
                            //   new Paragraph({
                            //     spacing: {
                            //       line: 276,
                            //       before: 60,
                            //     },
                            //     border: {
                            //       top: {
                            //         style: "single",
                            //         size: 6,
                            //         color: "000000",
                            //       },
                            //     },
                            //   }),

                            values.skills && values.skills.length &&
                            new Paragraph({
                                text: "SKILLS",
                                heading: HeadingLevel.HEADING_2,
                                spacing: {
                                    line: 276,
                                    before: 120,
                                },
                                // thematicBreak: wantHorizontalLine ? true : false,
                            }),

                            ...(values.skills || [])
                                .map((skill) => {
                                    const arr = [];
                                    arr.push(
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: skill,
                                                    size: 22,
                                                    font: "Cambria",
                                                }),
                                            ],
                                            spacing: {
                                                line: 276,
                                            },
                                            bullet: {
                                                level: 0,
                                            },
                                        })
                                    );
                                    return arr;
                                })
                                .reduce((prev, curr) => prev.concat(curr), []),
                            new Paragraph({}),

                            // values.achievements.length &&
                            //   new Paragraph({
                            //     spacing: {
                            //       line: 276,
                            //       before: 60,
                            //     },
                            //     border: {
                            //       top: {
                            //         style: "single",
                            //         size: 6,
                            //         color: "000000",
                            //       },
                            //     },
                            //   }),

                            values.achievements && values.achievements.length &&
                            new Paragraph({
                                text: "ACHIEVEMENTS",
                                heading: HeadingLevel.HEADING_2,
                                spacing: {
                                    line: 276,
                                    before: 120,
                                },
                                // thematicBreak: wantHorizontalLine ? true : false,
                            }),

                            ...(values.achievements || [])
                                .map((achievement) => {
                                    const arr = [];
                                    arr.push(
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: achievement,
                                                    size: 22,
                                                    font: "Cambria",
                                                }),
                                            ],
                                            spacing: {
                                                line: 276,
                                            },
                                            bullet: {
                                                level: 0,
                                            },
                                        })
                                    );
                                    return arr;
                                })
                                .reduce((prev, curr) => prev.concat(curr), []),
                            new Paragraph({}),
                            values.computerSkills && values.computerSkills.length &&
                            new Paragraph({
                                text: "COMPUTER SKILLS",
                                heading: HeadingLevel.HEADING_2,
                                spacing: {
                                    line: 276,
                                    before: 120,
                                },
                                // thematicBreak: wantHorizontalLine ? true : false,
                            }),
                            new Paragraph({}),

                            ...(values.computerSkills || [])
                                .map((skill) => {
                                    const arr = [];
                                    arr.push(
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: skill,
                                                    size: 22,
                                                    font: "Cambria",
                                                }),
                                            ],
                                            spacing: {
                                                line: 276,
                                            },
                                            bullet: {
                                                level: 0,
                                            },
                                        })
                                    );
                                    return arr;
                                })
                                .reduce((prev, curr) => prev.concat(curr), []),
                            new Paragraph({}),

                            values.languages && values.languages.length &&
                            new Paragraph({
                                text: "LANGUAGES",
                                heading: HeadingLevel.HEADING_2,
                                spacing: {
                                    line: 276,
                                    before: 120,
                                },
                                // thematicBreak: wantHorizontalLine ? true : false,
                            }),
                            new Paragraph({}),

                            ...(values.languages || [])
                                .map((language) => {
                                    const arr = [];
                                    arr.push(
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: language,
                                                    size: 22,
                                                    font: "Cambria",
                                                }),
                                            ],
                                            spacing: {
                                                line: 276,
                                            },
                                            bullet: {
                                                level: 0,
                                            },
                                        })
                                    );
                                    return arr;
                                })
                                .reduce((prev, curr) => prev.concat(curr), []),
                            new Paragraph({}),

                            // values.extraCurricular.length &&
                            //   new Paragraph({
                            //     spacing: {
                            //       line: 276,
                            //       before: 60,
                            //     },
                            //     border: {
                            //       top: {
                            //         style: "single",
                            //         size: 6,
                            //         color: "000000",
                            //       },
                            //     },
                            //   }),

                            values.extraCurricular && values.extraCurricular.length &&
                            new Paragraph({
                                text: "EXTRA-CURRICULAR ACTIVITIES",
                                heading: HeadingLevel.HEADING_2,
                                spacing: {
                                    line: 276,
                                    before: 120,
                                },
                                // thematicBreak: wantHorizontalLine ? true : false,
                            }),

                            ...(values.extraCurricular || [])
                                .map((activities) => {
                                    const arr = [];
                                    arr.push(
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: activities,
                                                    size: 22,
                                                    font: "Cambria",
                                                }),
                                            ],
                                            spacing: {
                                                line: 276,
                                            },
                                            bullet: {
                                                level: 0,
                                            },
                                        })
                                    );
                                    return arr;
                                })
                                .reduce((prev, curr) => prev.concat(curr), []),

                            // values.trainings.length &&
                            //   new Paragraph({
                            //     spacing: {
                            //       line: 276,
                            //       before: 60,
                            //     },
                            //     border: {
                            //       top: {
                            //         style: "single",
                            //         size: 6,
                            //         color: "000000",
                            //       },
                            //     },
                            //   }),

                            values.trainings && values.trainings.length &&
                            new Paragraph({
                                text: "TRAININGS",
                                heading: HeadingLevel.HEADING_2,
                                spacing: {
                                    line: 276,
                                    before: 120,
                                },
                                // thematicBreak: wantHorizontalLine ? true : false,
                            }),

                            ...(values.trainings || [])
                                .map((training) => {
                                    const arr = [];
                                    arr.push(
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: training,
                                                    size: 22,
                                                    font: "Cambria",
                                                }),
                                            ],
                                            spacing: {
                                                line: 276,
                                            },
                                            bullet: {
                                                level: 0,
                                            },
                                        })
                                    );
                                    return arr;
                                })
                                .reduce((prev, curr) => prev.concat(curr), []),
                            new Paragraph({}),

                            // values.certifications.length &&
                            //   new Paragraph({
                            //     spacing: {
                            //       line: 276,
                            //       before: 60,
                            //     },
                            //     border: {
                            //       top: {
                            //         style: "single",
                            //         size: 6,
                            //         color: "000000",
                            //       },
                            //     },
                            //   }),

                            values.certifications && values.certifications.length &&
                            new Paragraph({
                                text: "CERTIFICATIONS",
                                heading: HeadingLevel.HEADING_2,
                                spacing: {
                                    line: 276,
                                    before: 120,
                                },
                                // thematicBreak: wantHorizontalLine ? true : false,
                            }),

                            ...(values.certifications || [])
                                .map((certification) => {
                                    const arr = [];
                                    arr.push(
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: certification,
                                                    size: 22,
                                                    font: "Cambria",
                                                }),
                                            ],
                                            spacing: {
                                                line: 276,
                                            },
                                            bullet: {
                                                level: 0,
                                            },
                                        })
                                    );
                                    return arr;
                                })
                                .reduce((prev, curr) => prev.concat(curr), []),
                            new Paragraph({}),

                            // values.others.length &&
                            //   new Paragraph({
                            //     spacing: {
                            //       line: 276,
                            //       before: 60,
                            //     },
                            //     border: {
                            //       top: {
                            //         style: "single",
                            //         size: 6,
                            //         color: "000000",
                            //       },
                            //     },
                            //   }),

                            values.others && values.others.length &&
                            new Paragraph({
                                text: "Additional Points",
                                heading: HeadingLevel.HEADING_2,
                                spacing: {
                                    line: 276,
                                    before: 120,
                                },
                                // thematicBreak: wantHorizontalLine ? true : false,
                            }),

                            ...(values.others || [])
                                .map((other) => {
                                    const arr = [];
                                    arr.push(
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: other,
                                                    size: 22,
                                                    font: "Cambria",
                                                }),
                                            ],
                                            spacing: {
                                                line: 276,
                                            },
                                            bullet: {
                                                level: 0,
                                            },
                                        })
                                    );
                                    return arr;
                                })
                                .reduce((prev, curr) => prev.concat(curr), []),
                            new Paragraph({}),
                            values.ambiguous && values.ambiguous.length &&
                            new Paragraph({
                                text: "CAN'T PARSE",
                                heading: HeadingLevel.HEADING_2,
                                color: "#FF0000",
                                spacing: {
                                    line: 276,
                                    before: 120,
                                },
                                // thematicBreak: wantHorizontalLine ? true : false,
                            }),

                            ...(values.ambiguous || [])
                                .map((other) => {
                                    const arr = [];
                                    arr.push(
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: other,
                                                    color: "#FF0000",
                                                    size: 22,
                                                    font: "Cambria",
                                                }),
                                            ],
                                            spacing: {
                                                line: 276,
                                            },
                                            bullet: {
                                                level: 0,
                                            },
                                        })
                                    );
                                    return arr;
                                })
                                .reduce((prev, curr) => prev.concat(curr), []),
                            new Paragraph({}),

                        ],
                    },
                ],
            });
            console.log(values);
            // Save the document as a Blob
            const blob = await Packer.toBlob(doc);

            // Download the document
            saveAs(blob, "generated-doc.docx");
        } catch (error) {
            alert(error);
        }
    };
    const [formData, setFormData] = useState({
        text: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(e.target);
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const selectTextAfterLetter = (letter, text) => {
        const index = text.indexOf(letter);
        if (index !== -1) {
            const textAfterLetter = text.substring(index + 1); // Extract text after the letter
            return textAfterLetter.trim();
        } else {
            return text.trim();
        }
    }
    const getProfessionalSummary = (lines) => {
        let summary = "";
        try {
            let idx = 0;
            while (idx < lines.length) {
                if (lines[idx].toLowerCase().includes("professional")) {
                    summary += selectTextAfterLetter(":", lines[idx]);
                    idx++;
                    break;
                }
                idx++;
            }
            while (idx < lines.length && !(lines[idx].match(/\b[A-Z]+\:/g))) {
                summary += lines[idx].trim();
                idx++;
            }
        } catch (error) {
            console.log(error);
        }
        return summary;
    }
    const getExperience = (text) => {
        const experience = [];
        try {
            const experienceMatches = text.match(/EXPERIENCE:(.*)/si);
            if (!experienceMatches)
                return [];
            const experienceText = experienceMatches ? experienceMatches[1] : '';
            // console.log(experienceText);

            // const lowercaseText = experienceText.toLowerCase();
            const lowercaseText = experienceText;
            const parts = lowercaseText.split(/Job\d+/g);

            // const experienceEntries = experienceText.split('Job');
            const experienceEntries = parts.map((part, index) => {
                if (index !== parts.length - 1) {
                    return part + "Job";
                } else {
                    return part;
                }
            });
            experienceEntries.shift(); // Remove empty entry
            // console.log(experienceEntries);
            experienceEntries.forEach(entry => {
                const entryLines = entry.split('\n').filter(str => str.trim() !== "");
                const profileName = entry.match(/Profile Name(\d*): (.*)/i)[2];
                const companyName = entry.match(/Company Name(\d*): (.*)/i)[2];
                const date = entry.match(/date(\d*): (.*)/i)[2];
                const bulletPoints = [];
                let idx = 0;
                while (idx < entryLines.length) {
                    if (entryLines[idx].toLowerCase().includes("bullet")) {
                        idx++;
                        break;
                    }
                    idx++;
                }
                while (idx < entryLines.length) {
                    // console.log(entryLines[idx]);
                    if (entryLines[idx].match(/\b[A-Z]+\:/g) || entryLines[idx].toLowerCase().includes("additional") || entryLines[idx].toLowerCase().trim() == "job") {
                        break;
                    }
                    // console.log(entryLines[idx].match(/\b[A-Z]+\:/g));
                    if (entryLines[idx].toLowerCase()[0] == '-')
                        bulletPoints.push(selectTextAfterLetter("-", entryLines[idx]));
                    else
                        bulletPoints.push(selectTextAfterLetter(".", entryLines[idx]));
                    idx++;
                }
                const additionalPoints = [];
                if (idx < entryLines.length && entryLines[idx].toLowerCase().includes("additional")) {
                    idx++;
                    while (idx < entryLines.length) {
                        if (entryLines[idx].toLowerCase()[0] != '-' && !(entryLines[idx].toLowerCase()[0] >= 1 || entryLines[idx].toLowerCase()[0] <= 9)) {
                            idx++;
                            break;
                        }
                        if (entryLines[idx].toLowerCase()[0] == '-')
                            additionalPoints.push(selectTextAfterLetter("-", entryLines[idx]));
                        else
                            additionalPoints.push(selectTextAfterLetter(".", entryLines[idx]));
                        idx++;
                    }
                }
                experience.push({ profileName, companyName, date, bulletPoints, additionalPoints });
            });
        } catch (error) {
            console.log(error);
        }
        // console.log(experience);
        return experience;
    }
    const getInternshipExperience = (text) => {
        const Internships = [];
        try {


            const IntershipMatches = text.match(/INTERNSHIP EXPERIENCE:(.*)/si);
            // console.log(text);
            if (!IntershipMatches)
                return [];
            const internshipText = IntershipMatches ? IntershipMatches[1] : '';
            // console.log(internshipText);
            // const lowercaseText = internshipText.toLowerCase();
            const lowercaseText = internshipText;
            const parts = lowercaseText.split(/Internship\s+(\d+)/);

            // const internshipEnteries = internshipText.split('Internship');
            const internshipEnteries = parts.map((part, index) => {
                if (index !== parts.length - 1) {
                    return part + "Internship";
                } else {
                    return part;
                }
            });
            internshipEnteries.shift(); // Remove empty entry
            // console.log(parts);
            internshipEnteries.forEach(entry => {
                // console.log(entry);
                const entryLines = entry.split('\n').filter(str => str.trim() !== "");
                let profileName = "", companyName = "", date = "";
                if (entry.match(/Profile Name(\d*): (.*)/i))
                    profileName = entry.match(/Profile Name(\d*): (.*)/i)[2];
                if (entry.match(/Company Name(\d*): (.*)/i))
                    companyName = entry.match(/Company Name(\d*): (.*)/i)[2];
                if (entry.match(/date(\d*): (.*)/i))
                    date = entry.match(/date(\d*): (.*)/i)[2];
                const bulletPoints = [];
                let idx = 0;
                while (idx < entryLines.length) {
                    if (entryLines[idx].toLowerCase().includes("bullet")) {
                        idx++;
                        break;
                    }
                    idx++;
                }
                while (idx < entryLines.length) {
                    if (entryLines[idx].match(/\b[A-Z]+\:/g) || entryLines[idx].toLowerCase().includes("additional") || entryLines[idx].toLowerCase().trim() == "internship") {
                        break;
                    }
                    if (entryLines[idx].toLowerCase()[0] == '-')
                        bulletPoints.push(selectTextAfterLetter("-", entryLines[idx]));
                    else
                        bulletPoints.push(selectTextAfterLetter(".", entryLines[idx]));
                    idx++;
                }
                const additionalPoints = [];
                if (idx < entryLines.length && entryLines[idx].toLowerCase().includes("additional")) {
                    idx++;
                    while (idx < entryLines.length) {
                        if (entryLines[idx].toLowerCase()[0] != '-' && !(entryLines[idx].toLowerCase()[0] >= 1 || entryLines[idx].toLowerCase()[0] <= 9)) {
                            idx++;
                            break;
                        }
                        if (entryLines[idx].toLowerCase()[0] == '-')
                            additionalPoints.push(selectTextAfterLetter("-", entryLines[idx]));
                        else
                            additionalPoints.push(selectTextAfterLetter(".", entryLines[idx]));
                        idx++;
                    }
                }
                Internships.push({ profileName, companyName, date, bulletPoints, additionalPoints });
            });
        } catch (error) {
            console.log(error);
        }
        // console.log(Internships);
        return Internships;
    }
    const getEducation = (text) => {
        const Educations = [];
        try {

            const EducationMatches = text.match(/EDUCATION:(.*)/si);
            if (!EducationMatches)
                return [];
            const EducationText = EducationMatches ? EducationMatches[1] : '';
            const lines = EducationText.split('\n').filter(str => str.trim() !== "");
            let idx = 0;
            while (idx < lines.length) {
                if (lines[idx].toLowerCase().includes("name")) {
                    const edu = {
                        collegeName: selectTextAfterLetter(":", lines[idx]),
                        courseName: selectTextAfterLetter(":", lines[idx + 1]),
                        dates: selectTextAfterLetter(":", lines[idx + 2])
                    }
                    idx += 3;
                    if (lines[idx].toLowerCase().includes("gpa") || lines[idx].toLowerCase().includes("cgpa")) {
                        edu.marks = selectTextAfterLetter(":", lines[idx]);
                        idx++;
                    }
                    // console.log(edu);
                    Educations.push(edu);
                }
                else
                    break;
            }
        } catch (error) {
            console.log(error);
        }
        return Educations;
    }
    const getCertification = (text) => {
        const Certifications = [];
        try {


            let CertificationMatches = text.match(/CERTIFICATIONS:(.*)/si);
            if (!CertificationMatches)
                CertificationMatches = text.match(/CERTIFICATES:(.*)/si);
            const certificationText = CertificationMatches ? CertificationMatches[1] : '';
            const lines = certificationText.split('\n').filter(str => str.trim() !== "");
            let idx = 0;
            while (idx < lines.length) {
                if (lines[idx].toLowerCase().includes(":"))
                    break;
                Certifications.push(selectTextAfterLetter("-", lines[idx]));
                idx++;
            }
        } catch (error) {
            console.log(error);
        }
        // console.log(Certifications);
        return Certifications;
    }
    const getProjects = (text) => {
        const projects = [];
        try {
            let projectMatches = text.match(/PROJECTS:(.*)/si);
            // console.log(projectMatches);
            if (!projectMatches)
                projectMatches = text.match(/PROJECT:(.*)/si);
            const projectText = projectMatches ? projectMatches[1] : '';
            const lowercaseText = projectText.toLowerCase();
            const parts = lowercaseText.split(/project name\d+/gi);

            const projectEnteries = parts.map((part, index) => {
                if (index !== parts.length - 1) {
                    return part + "project name";
                } else {
                    return part;
                }
            });
            for (let i = 1; i < projectEnteries.length; i++) {
                // console.log(projectEnteries[i]);
                const lines = projectEnteries[i].split('\n').filter(str => str.trim() !== "");
                let idx = 0;
                // console.log(lines);
                const proj = {
                    projectName: "",
                    date: "",
                    projectDetails: [],
                }
                proj.projectName = selectTextAfterLetter(":", lines[idx]);
                idx++;
                if (idx < lines.length && lines[idx].toLowerCase().includes("date")) {
                    proj.date = selectTextAfterLetter(":", lines[idx]);
                    idx++;
                }
                if (idx < lines.length && lines[idx].toLowerCase().includes("detail")) {
                    idx++;
                    while (idx < lines.length && (lines[idx].trim()[0] == '-')) {
                        proj.projectDetails.push(selectTextAfterLetter("-", lines[idx]));
                        idx++;
                    }
                }
                projects.push(proj);
                // console.log(proj);
            }
        } catch (error) {
            console.log(error);
        }
        return projects;
    }
    const getSkills = (text) => {
        const skills = [];
        try {
            const skillMatches = text.match(/SKILLS:(.*)/si);
            if (!skillMatches)
                return [];
            const skillText = skillMatches ? skillMatches[1] : '';
            const lines = skillText.split('\n').filter(str => str.trim() !== "");
            let idx = 0;
            while (idx < lines.length) {
                if (!lines[idx].toLowerCase().includes("-"))
                    break;
                skills.push(selectTextAfterLetter("-", lines[idx]));
                idx++;
            }
        } catch (error) {
            console.log(error);
        }
        return skills;
    }
    const getAchievments = (text) => {
        const achievements = [];
        try {


            const achievementMatches = text.match(/ACHIEVEMENTS:(.*)/si);
            if (!achievementMatches)
                return [];
            const achievementText = achievementMatches ? achievementMatches[1] : '';
            const lines = achievementText.split('\n').filter(str => str.trim() !== "");
            let idx = 0;
            while (idx < lines.length) {
                if (!lines[idx].toLowerCase().includes("-"))
                    break;
                achievements.push(selectTextAfterLetter("-", lines[idx]));
                idx++;
            }
        } catch (error) {
            console.log(error);
        }
        return achievements;
    }
    const getLanguages = (text) => {
        const achievements = [];
        try {
            const achievementMatches = text.match(/LANGUAGES:(.*)/si);
            if (!achievementMatches)
                return [];
            const achievementText = achievementMatches ? achievementMatches[1] : '';
            const lines = achievementText.split('\n').filter(str => str.trim() !== "");
            let idx = 0;
            while (idx < lines.length) {
                if (!lines[idx].toLowerCase().includes("-"))
                    break;
                achievements.push(selectTextAfterLetter("-", lines[idx]));
                idx++;
            }
        } catch (error) {
            console.log(error);
        }
        return achievements;
    }
    const getComputerSkills = (text) => {
        const achievements = [];
        try {
            const achievementMatches = text.match(/COMPUTER SKILLS:(.*)/si);
            if (!achievementMatches)
                return [];
            const achievementText = achievementMatches ? achievementMatches[1] : '';
            const lines = achievementText.split('\n').filter(str => str.trim() !== "");
            let idx = 0;
            while (idx < lines.length) {
                if (!lines[idx].toLowerCase().includes("-"))
                    break;
                achievements.push(selectTextAfterLetter("-", lines[idx]));
                idx++;
            }
        } catch (error) {
            console.log(error);
        }
        return achievements;
    }
    const getInterests = (text) => {
        const Interests = [];
        try {


            const achievementMatches = text.match(/INTERESTS:(.*)/si);
            if (!achievementMatches)
                return [];
            const achievementText = achievementMatches ? achievementMatches[1] : '';
            const lines = achievementText.split('\n').filter(str => str.trim() !== "");
            let idx = 0;
            while (idx < lines.length) {
                if (!lines[idx].toLowerCase().includes("-"))
                    break;
                Interests.push(selectTextAfterLetter("-", lines[idx]));
                idx++;
            }
        } catch (error) {
            console.log(error);
        }
        return Interests;
    }
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        const defaulValue = {
            name: "",
            phoneNumber: "",
            email: "",
            linkedin: "",
            professionalSummary: "",
            section: {},
            skills: [],
            achievements: [],
            extraCurricular: [],
            trainings: [],
            certifications: [],
            others: [],
            project: [],
            experience: [],
            internships: [],
            education: [],
            computerSkills: [],
            languages: []
        };
        const resumeText = formData.text;
        const lines = resumeText.split('\n').filter(str => str.trim() !== "");
        // Regular expressions for pattern matching
        const emailRegex = /(?:\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/g;
        const phoneNumberRegex = /(?:\b\d{3}[-.]|\(\d{3}\)\s*)\d{3}[-.]\d{4}\b/g;
        const dateRegex = /(?:\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?) (?:0[1-9]|[12]\d|3[01]), (?:19|20)\d{2}\b)/g;
        const bulletPointsRegex = /(?:- .*)/g;

        if (formData.text.match(/NAME:\s*(.*)/i))
            defaulValue.name = formData.text.match(/NAME:\s*(.*)/i)[1];
        if (formData.text.match(/EMAIL:\s*(.*)/i))
            defaulValue.email = formData.text.match(/EMAIL:\s*(.*)/i)[1];
        if (formData.text.match(/PHONE NUMBER:\s*(.*)/i))
            defaulValue.phoneNumber = formData.text.match(/PHONE NUMBER:\s*(.*)/i)[1];
        if (formData.text.match(/LINKEDIN:\s*(.*)/))
            defaulValue.linkedin = formData.text.match(/LINKEDIN:\s*(.*)/)[1];
        defaulValue.professionalSummary = getProfessionalSummary(lines);
        defaulValue.experience = getExperience(formData.text);
        defaulValue.internships = getInternshipExperience(formData.text);
        defaulValue.education = getEducation(formData.text);
        defaulValue.certifications = getCertification(formData.text);
        defaulValue.project = getProjects(formData.text);
        defaulValue.skills = getSkills(formData.text);
        defaulValue.achievements = getAchievments(formData.text);
        defaulValue.languages = getLanguages(formData.text);
        defaulValue.computerSkills = getComputerSkills(formData.text);
        defaulValue.others = getInterests(formData.text);
        console.log(defaulValue);
        setValues(defaulValue);
    }
    return (
        <div>
            <h1>Generate Resume</h1>
            <div className='form-container'>
                <form onSubmit={handleSubmit2}>
                    <div className='form-group'>
                        <label htmlFor="text">Text:</label>
                        <textarea
                            type="text"
                            id="text"
                            name="text"
                            value={formData.text}
                            onChange={handleChange}
                            cols={50}
                            rows={10}
                        />
                    </div>
                    <button className="submit-button" type="submit">Load data</button>
                </form>
                <button className='submit-button' onClick={() => {
                    generateDocx();
                    // console.log(values);
                }}>Download</button>
            </div>
        </div>
    )
}
export default GenerateForm;
