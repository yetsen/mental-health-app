package com.mentalhealth.app.web.rest.errors;

public class CompanyCodeNotFoundException extends BadRequestAlertException {

	public CompanyCodeNotFoundException () {
		super(ErrorConstants.COMPANY_CODE_NOT_FOUND, "Company code not found!", "companyCodeNotFound", "companycodenotfound");
	}
}
