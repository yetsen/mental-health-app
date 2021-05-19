package com.mentalhealth.app.service;

public class CompanyCodeNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public CompanyCodeNotFoundException () {
        super("Company code not found!");
    }

}
