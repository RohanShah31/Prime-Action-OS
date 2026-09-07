from fastapi import APIRouter, Depends
from app.services.approval_matrix_service import ApprovalMatrixService
from decimal import Decimal

router = APIRouter(prefix="/api/approval-matrix", tags=["Approval Matrix"])

@router.get("/{benefit}")
def approver(benefit: float):
    service = ApprovalMatrixService()
    return {
        "approver": service.determine_approver(Decimal(benefit))
    }
