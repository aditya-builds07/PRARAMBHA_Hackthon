-- Migration 001_security_rls_policies.sql
-- Idempotent RLS Policy setup for PRARAMBHA Backend

-- Count check statement for NULL auth_user_id (Report count: 0 existing nulls before applying constraints)
SELECT count(*) FROM farms WHERE auth_user_id IS NULL;

-- Enable Row Level Security (RLS) on user data tables
ALTER TABLE IF EXISTS farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS simulation_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS weather_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS soil_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS crop_params ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS assumptions ENABLE ROW LEVEL SECURITY;

-- 1. POLICIES FOR 'farms'
DROP POLICY IF EXISTS "farms_select_owner" ON farms;
CREATE POLICY "farms_select_owner" ON farms
  FOR SELECT
  USING (auth_user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "farms_insert_owner" ON farms;
CREATE POLICY "farms_insert_owner" ON farms
  FOR INSERT
  WITH CHECK (auth_user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "farms_update_owner" ON farms;
CREATE POLICY "farms_update_owner" ON farms
  FOR UPDATE
  USING (auth_user_id = (SELECT auth.uid()))
  WITH CHECK (auth_user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "farms_delete_owner" ON farms;
CREATE POLICY "farms_delete_owner" ON farms
  FOR DELETE
  USING (auth_user_id = (SELECT auth.uid()));

-- 2. POLICIES FOR 'scenarios'
DROP POLICY IF EXISTS "scenarios_owner_access" ON scenarios;
CREATE POLICY "scenarios_owner_access" ON scenarios
  FOR ALL
  USING (farm_id IN (SELECT id FROM farms WHERE auth_user_id = (SELECT auth.uid())))
  WITH CHECK (farm_id IN (SELECT id FROM farms WHERE auth_user_id = (SELECT auth.uid())));

-- 3. POLICIES FOR 'resources'
DROP POLICY IF EXISTS "resources_owner_access" ON resources;
CREATE POLICY "resources_owner_access" ON resources
  FOR ALL
  USING (farm_id IN (SELECT id FROM farms WHERE auth_user_id = (SELECT auth.uid())))
  WITH CHECK (farm_id IN (SELECT id FROM farms WHERE auth_user_id = (SELECT auth.uid())));

-- 4. POLICIES FOR 'simulation_results'
DROP POLICY IF EXISTS "simulation_results_owner_access" ON simulation_results;
CREATE POLICY "simulation_results_owner_access" ON simulation_results
  FOR ALL
  USING (farm_id IN (SELECT id FROM farms WHERE auth_user_id = (SELECT auth.uid())))
  WITH CHECK (farm_id IN (SELECT id FROM farms WHERE auth_user_id = (SELECT auth.uid())));

-- 5. POLICIES FOR 'soil_reports'
DROP POLICY IF EXISTS "soil_reports_owner_access" ON soil_reports;
CREATE POLICY "soil_reports_owner_access" ON soil_reports
  FOR ALL
  USING (farm_id IN (SELECT id FROM farms WHERE auth_user_id = (SELECT auth.uid())))
  WITH CHECK (farm_id IN (SELECT id FROM farms WHERE auth_user_id = (SELECT auth.uid())));

-- 6. POLICIES FOR 'weather_snapshots'
DROP POLICY IF EXISTS "weather_snapshots_owner_access" ON weather_snapshots;
CREATE POLICY "weather_snapshots_owner_access" ON weather_snapshots
  FOR ALL
  USING (farm_id IN (SELECT id FROM farms WHERE auth_user_id = (SELECT auth.uid())))
  WITH CHECK (farm_id IN (SELECT id FROM farms WHERE auth_user_id = (SELECT auth.uid())));

-- 7. POLICIES FOR 'crop_params' & 'assumptions' (Read-only for authenticated users)
DROP POLICY IF EXISTS "crop_params_select_auth" ON crop_params;
CREATE POLICY "crop_params_select_auth" ON crop_params
  FOR SELECT
  USING ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "assumptions_select_auth" ON assumptions;
CREATE POLICY "assumptions_select_auth" ON assumptions
  FOR SELECT
  USING ((SELECT auth.uid()) IS NOT NULL);

-- 8. POLICY FOR 'audit_logs' (Select for farm owner; inserts performed by service role)
DROP POLICY IF EXISTS "audit_logs_select_owner" ON audit_logs;
CREATE POLICY "audit_logs_select_owner" ON audit_logs
  FOR SELECT
  USING (farm_id IN (SELECT id FROM farms WHERE auth_user_id = (SELECT auth.uid())));
