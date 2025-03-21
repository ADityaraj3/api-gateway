//Import Packages
import { Injectable } from '@nestjs/common';

//Import Files
import { PermissionsGuardStrategy } from '../strategy/has-access-guard.strategy';

@Injectable()
export class HasAccessGuard extends PermissionsGuardStrategy {}
