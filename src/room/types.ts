export function TableCard() {
    this.payload = {
        "google": {
            "expectUserResponse": true,
            "richResponse": {
                "items": [
                    {
                        "simpleResponse": {
                            "textToSpeech": "Ecco gli orari. "
                        }
                    },
                    {
                        "tableCard": {
                            "title": "Orari",
                            "rows": [],
                            "columnProperties": [
                                {
                                    "header": "Orari",
                                    "horizontalAlignment": "CENTER"
                                },
                                {
                                    "header": "Lezione",
                                    "horizontalAlignment": "CENTER"
                                },
                                {
                                    "header": "Prof.",
                                    "horizontalAlignment": "CENTER"
                                }
                            ]
                        }
                    },
                    {
                        "simpleResponse": {
                            "textToSpeech": "Posso fare altro per te?"
                        }
                    }
                ],
                "suggestions": [
                    {
                        "title": "Orari 1C150"
                    },
                    {
                        "title": "Orari LabTA"
                    },
                    {
                        "title": "Orari LuF1"
                    },
                    {
                        "title": "Orari 2AB40"
                    }
                ]
            }
        }
    };
}

export function TableCardEvent() {
    this.payload = {
        "google": {
            "expectUserResponse": true,
            "richResponse": {
                "items": [
                    {
                        "simpleResponse": {
                            "textToSpeech": "Ecco gli eventi in programma. "
                        }
                    },
                    {
                        "tableCard": {
                            "title": "Orari",
                            "rows": [],
                            "columnProperties": [
                                {
                                    "header": "Descrizione"
                                },
                                {
                                    "header": "Tipo evento"
                                }
                            ]
                        }
                    },
                    {
                        "simpleResponse": {
                            "textToSpeech": "Posso fare altro per te?"
                        }
                    }
                ],
                "suggestions": [
                    {
                        "title": "Orari 1C150"
                    },
                    {
                        "title": "Orari LuF2"
                    },
                    {
                        "title": "Orari LuF1"
                    },
                    {
                        "title": "Orari 1D100"
                    }
                ]
            }
        }
    };
}