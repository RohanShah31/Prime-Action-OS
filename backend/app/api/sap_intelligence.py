from fastapi import APIRouter
from app.services.sap.sap_metadata_service import SAPMetadataService
from app.services.sap.sap_rule_extraction_service import SAPRuleExtractionService
from app.services.sap.sap_process_service import SAPProcessService
from app.services.sap.sap_authorization_service import SAPAuthorizationService
from app.services.sap.sap_transport_analysis_service import SAPTransportAnalysisService

router = APIRouter(prefix="/api/sap-intelligence", tags=["SAP Intelligence"])

@router.get("/metadata")
def metadata():
    service = SAPMetadataService()
    return service.scan_metadata()

@router.get("/rules")
def rules():
    service = SAPRuleExtractionService()
    # Mocking metadata input for now
    return service.extract_rules({})

@router.get("/processes")
def processes():
    service = SAPProcessService()
    return service.build_event_log("O2C")

@router.get("/authorization-impact")
def authorization_impact():
    service = SAPAuthorizationService()
    return service.analyze_impact(1)

@router.get("/transport-impact")
def transport_impact():
    service = SAPTransportAnalysisService()
    return service.analyze(1)
