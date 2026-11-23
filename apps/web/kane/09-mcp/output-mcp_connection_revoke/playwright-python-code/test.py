import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="fd44490f-f9d0-4820-b054-b90dcc1e05f6",
    name="Revoke API Token",
    tc_id="TC-55",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"kane_test_client_listed_under_tokens": "true", "kane_test_client_connected_via_mcp_note": "true", "kane_test_client_no_longer_listed": "false"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 640391, "name": "mcp_authorize_url", "value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=grusIkoOXLBrjqAMVwgPxpGFikBoDARa&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "session_value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=grusIkoOXLBrjqAMVwgPxpGFikBoDARa&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 640392, "name": "mcp_deny_url", "value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=hrowywDKEDWjuTmjMlEgTmmHCVIHhSIb&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "session_value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=hrowywDKEDWjuTmjMlEgTmmHCVIHhSIb&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/login?next=/acme/dashboard/settings/token', instruction_id='20037835-3f03-43f7-9c55-243fa92b3578'):
        variable_value_0 = var('{{global.base_url}}/login?next=/acme/dashboard/settings/token')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for the sign-in form to be ready', instruction_id='82c0b70b-1950-4c92-9130-f4e5435078c8'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='62489caa-ec40-400f-afd9-3d4a9f0b0652'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "[REDACTED]" into "Password"', instruction_id='a5f95ca3-faa3-478f-ad99-9b0d13402626'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        variable_value_4 = var('{{secrets.user.e2e_password}}')
        
        await testmu.fill(element_3, variable_value_4)
    
    async with testmu.step('Clicking Sign in with email and password button', instruction_id='4020db05-1877-4ec0-9330-1d5434c439b2'):
        _loc_1 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Checking whether Kane Test Client is listed under Tokens'):
        set_var('kane_test_client_listed_under_tokens', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {30: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(30).textContent.trim() === 'Kane Test Client');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="Kane Test Client"i'], query='whether Kane Test Client is present in the Tokens list', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="'Kane Test Client' is listed under Tokens."))
    
    async with testmu.step('Checking whether Kane Test Client has the Connected via MCP note'):
        set_var('kane_test_client_connected_via_mcp_note', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {31: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(31).textContent.includes('Connected via MCP'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="Connected via MCP · by E2E"i'], query='whether the Connected via MCP note for Kane Test Client is present in the Tokens list', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="'Kane Test Client' has the note 'Connected via MCP'."))
    
    async with testmu.step('Assertion check', instruction_id='d5de351b-1899-462a-8920-b986d436c913'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "'Kane Test Client' is listed under Tokens.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{kane_test_client_listed_under_tokens}}', 'store_key': 'kane_test_client_listed_under_tokens', 'variable_refs': {'{{kane_test_client_listed_under_tokens}}': 'true'}}, {'description': "'Kane Test Client' has the note 'Connected via MCP'.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{kane_test_client_connected_via_mcp_note}}', 'store_key': 'kane_test_client_connected_via_mcp_note', 'variable_refs': {'{{kane_test_client_connected_via_mcp_note}}': 'true'}}], 'sub_checks': [{'description': "'Kane Test Client' is listed under Tokens.", 'store_key': 'kane_test_client_listed_under_tokens', 'expected_value': 'true', 'extracted_value': '{{kane_test_client_listed_under_tokens}}', 'operator': 'equals', 'transforms': []}, {'description': "'Kane Test Client' has the note 'Connected via MCP'.", 'store_key': 'kane_test_client_connected_via_mcp_note', 'expected_value': 'true', 'extracted_value': '{{kane_test_client_connected_via_mcp_note}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "'Kane Test Client' is listed under Tokens with the note 'Connected via MCP'."})
    
    async with testmu.step('Clicking Revoke for Kane Test Client in the Tokens section', instruction_id='f519a82c-f8f3-4987-ade6-95dc86344977'):
        _loc_2 = page.locator("internal:role=button[name=\"Revoke Kane Test Client\"i]")
        
        await _loc_2.click()
    
    async with testmu.step('Clicking Revoke in the confirmation dialog', instruction_id='353ea36c-58f0-48fb-8ccc-985a853aa2b5'):
        _loc_3 = page.locator("internal:role=button[name=\"Revoke\"i]")
        
        await _loc_3.click()
    
    async with testmu.step("whether 'Kane Test Client' is present in the Tokens list on the Loop API tokens settings page", instruction_id='da27691e-f278-4603-b9b2-283850f7288a'):
        set_var('kane_test_client_no_longer_listed', await testmu.vision_query(page, "whether 'Kane Test Client' is present in the Tokens list on the Loop API tokens settings page", ""))
    
    async with testmu.step('Assertion check', instruction_id='28092e01-d4f0-441d-aefe-e2b526e7b17a'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "'Kane Test Client' is no longer listed.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{kane_test_client_no_longer_listed}}', 'store_key': 'kane_test_client_no_longer_listed', 'variable_refs': {'{{kane_test_client_no_longer_listed}}': 'false'}}], 'sub_checks': [{'description': "'Kane Test Client' is no longer listed.", 'store_key': 'kane_test_client_no_longer_listed', 'expected_value': 'false', 'extracted_value': '{{kane_test_client_no_longer_listed}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "'Kane Test Client' is no longer listed."})


if __name__ == "__main__":
    testmu.run(test)